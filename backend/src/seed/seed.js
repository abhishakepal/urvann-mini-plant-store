import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Plant from "../models/Plant.js";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "urvann_mini_store" });
    const raw = fs.readFileSync(path.join(__dirname, "plants.json"), "utf-8");
    const plants = JSON.parse(raw);

    await Plant.deleteMany({});
    await Plant.insertMany(plants);
    console.log(`✅ Seeded ${plants.length} plants.`);
  } catch (e) {
    console.error("❌ Seed error:", e.message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
