import { Request, Response } from "express";
import { readDB, writeDB } from "../db";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../models/taskModel";

export const getTasks = (req: Request, res: Response) => {
  const tasks = readDB();
  res.json(tasks); // returns array of tasks
};

export const createTask = (req: Request, res: Response) => {
  const tasks = readDB(); // array of tasks
  const newTask: Task = { id: uuidv4(), completed: false, ...req.body }; // default completed false if not provided

  tasks.push(newTask);
  writeDB(tasks);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  try {
    const tasks = readDB();

    // defensive: ensure tasks is an array
    if (!Array.isArray(tasks)) {
      console.error("updateTask: readDB returned non-array:", tasks);
      return res.status(500).json({ error: "Server DB format error" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing task id in params" });
    }

    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    // merge updates (avoid allowing id overwrite)
    const updates = { ...req.body };
    delete (updates as any).id;

    tasks[index] = { ...tasks[index], ...updates };

    // persist
    writeDB(tasks);

    return res.status(200).json(tasks[index]);
  } catch (err) {
    console.error("updateTask error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  try {
    const tasks = readDB(); // should be an array
    if (!Array.isArray(tasks)) {
      console.error("readDB did not return an array:", tasks);
      return res.status(500).json({ error: "Server DB format error" });
    }

    const { id } = req.params;
    const filtered = tasks.filter((task) => task.id !== id);

    if (filtered.length === tasks.length) {
      // nothing removed
      return res.status(404).json({ error: "Task not found" });
    }

    // writeDB expects array of Task
    writeDB(filtered);

    // return updated array or success message (use 200 and a JSON body so client can parse)
    return res.status(200).json({ message: "Deleted", remaining: filtered.length });
  } catch (err) {
    console.error("Error during deleteTask:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
