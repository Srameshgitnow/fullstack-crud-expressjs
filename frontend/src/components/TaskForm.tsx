import React, { JSX, useState } from "react";
import { Task } from "../types";
import "./TaskForm.scss";

type Props = {
  onAdd: (task: Omit<Task, "id">) => void;
};

export default function TaskForm({ onAdd }: Props): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title,
      description,
      completed: false,
    });

    setTitle("");
    setDescription("");
  }

  // ✅ IMPORTANT: must return JSX here
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
