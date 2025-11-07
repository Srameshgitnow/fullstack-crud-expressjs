// models/db.ts
import fs from "fs";
import path from "path";
import { Task } from "./models/taskModel";

const DB_FILE = path.join(process.cwd(), "db.json");

export const readDB = (): Task[] => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ tasks: [] }, null, 2), "utf-8");
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data.tasks) ? (data.tasks as Task[]) : [];
  } catch (err) {
    console.error("readDB error - returning empty array:", err);
    // If corrupted, try to recover by overwriting with empty array (optional)
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify({ tasks: [] }, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to recover db.json:", e);
    }
    return [];
  }
};

export const writeDB = (tasks: Task[]) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify({ tasks }, null, 2), "utf-8");
    console.log(`Wrote ${tasks.length} tasks to ${DB_FILE}`);
  } catch (err) {
    console.error("writeDB failed:", err);
    throw err; // let controller handle it
  }
};
