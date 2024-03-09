import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

// MongoDB setup
const uri = "mongodb+srv://yannelroy0:U0DS5s7KLG5A6NLQ@cluster0.wkd6hm1.mongodb.net/";
const client = new MongoClient(uri);
const dbName = "Cluster0";
const collectionName = "buttonStates";
 
async function addButtonsIfNeeded(db, collection) {
  const existingButtonsCount = await collection.countDocuments();
  if (existingButtonsCount === 0) {
    console.log('No buttons found, adding buttons...');
    const buttons = [
      { id: 1, state: 'off' },
      { id: 2, state: 'off' },
      // Add more buttons as needed

    ];
    await collection.insertMany(buttons);
    console.log(`${buttons.length} buttons were added.`);
  } else {
    // console.log('Buttons already exist, no new buttons were added.');
    //delete all buttons
    // await collection.deleteMany({});
  }
}

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Call addButtonsIfNeeded here
    await addButtonsIfNeeded(db, collection);

    app.get('/buttons', async (req, res) => {
      const buttonStates = await collection.find({}).toArray();
    //   console.log('Button states:', buttonStates);
      res.json(buttonStates);
    });

    app.patch('/buttons', async (req, res) => {
        const { id, state } = req.body;
        console.log('Updating button', id, 'to', state);
        try {
            // Convert string ID to ObjectId
            const objectId = new ObjectId(id);
            await collection.updateOne({ _id: objectId }, { $set: { state: state } });
            res.status(200).send('Button state updated');
            // console.log('Button state updated');
            // Print database
            const buttonStates = await collection.find({}).toArray();
            console.log('Button states:', buttonStates);
        } catch (error) {
            console.error('Error updating button state:', error);
            res.status(500).send('Error updating button state');
        }
    });
    

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } finally {
    // Consider handling client.close() here if needed
  }
}

main().catch(console.error);


