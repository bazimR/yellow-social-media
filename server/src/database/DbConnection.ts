import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connect() {
  const mongodb = await MongoMemoryServer.create();
  const getUri = mongodb.getUri();

  mongoose.set("strictQuery", true);
  const db = await mongoose.connect("mongodb://localhost:27017/");
  console.log("Database connected");
  return db;
}
