import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import {body, validationResult} from 'express-validator';
import session from 'express-session';
import bcrypt from 'bcrypt';
import User from './models/user_model.mjs';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;
app.use(express.json());
app.use(cors(
  {
    origin: "*",
    credentials: true
  }
));


const saltrounds = 10;

// MongoDB setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "Cluster0";
const collectionName = "users";

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: uri }),
  cookie: { secure: 'auto', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

const validator = [
  body('username').isLength({ min: 3}),
  body('email').isEmail(),
  body('password').isLength({ min: 3}),
];

// Connect to MongoDB
client.connect().then(() => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    app.locals.db = db;
}).catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
} );

const checkAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'User not logged in' });
  }
};

app.post("/register", async (req, res) => {
  console.log('Registering user:', req.body);
  const db = req.app.locals.db;
  const collection = db.collection(collectionName);
  const { username, email, password } = req.body;
  try {

    // Check if the user already exists
    const userExists = await collection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create a new user
    console.log('Creating new user:', username);
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await collection.insertOne(newUser);
    console.log('New user created:', newUser);
    // add a success message
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {

  const db = req.app.locals.db;
  const collection = db.collection(collectionName);
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    req.session.user = {_id: user._id, username: user.username, email: user.email};
    res.status(200).json({message:"Login Successful", user:req.session.user, token: req.sessionID});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/logout", checkAuthenticated, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).json({ message: 'Error logging out' });
      return;
    }
  });
  res.clearCookie('connect.sid');
  res.status(200).json('Logged out');
});

app.get("/user", checkAuthenticated, (req, res) => {
  res.status(200).json(req.session.user);
});

app.get("/preferences", checkAuthenticated, async (req, res) => {
  console.log('Getting preferences for user:', req.session.user);
  const db = req.app.locals.db;
  const collection = db.collection(collectionName);
  const user = await collection.findOne({ _id: new ObjectId(req.session.user._id) });
  const preferences = { language: user.language, fontSize: user.fontSize,
                          brightness: user.brightness, speechToText: user.speechToText,
                                  selectedApps: user.selectedApps, theme: user.theme};
  res.status(200).json(preferences);
});


app.put("/preferences", checkAuthenticated, async (req, res) => {
  console.log('Updating preferences for user:', req.session.user);
  const db = req.app.locals.db;
  const collection = db.collection(collectionName);
  const { language, fontSize, brightness, speechToText, selectedApps, theme} = req.body;
  console.log('New preferences:', req.body);
  try {
    await collection.updateOne({ _id: new ObjectId(req.session.user._id) },
      { $set: { language, fontSize, brightness, speechToText, selectedApps, theme } });
    res.status(200).json('Preferences updated');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/deleteAll", async (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection(collectionName);
  try {
    await collection.deleteMany();
    res.status(200).json('All users deleted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
