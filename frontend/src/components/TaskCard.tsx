import React from "react";
import { Task } from "../types";
import "./TaskCard.scss";

type Props = {
    task: Task;
    onToggle: (task: Task) => void;
    onDelete: (id:string | number) => void;
}

export default function TaskCard({task, onToggle, onDelete}: Props) {
    return (
        <div className={`task-card ${task.completed ? "completed" : ""}`}>
            <div>
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
            </div>
            <div className="actions">
                <button onClick={() => onToggle({...task, completed: !task.completed})}>
                    {task.completed ? "Undo!" : "Done"}
                </button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
}
