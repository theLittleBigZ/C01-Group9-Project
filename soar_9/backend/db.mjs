import { MongoClient } from 'mongodb';

const uri = "your_mongodb_connection_string";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db('your_database_name'); // Adjust as needed
  } catch (error) {
    console.error("Could not connect to DB:", error);
    process.exit(1);
  }
}

export default connectDB;
