import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://meenusbp:meenusbp@cluster0.aqhcg6h.mongodb.net/?retryWrites=true&w=majority"
);

const db = client.db("main");
