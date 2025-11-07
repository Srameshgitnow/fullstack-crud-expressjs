import React, {useState, useEffect} from "react";
import {Task } from "../types";
import { deleteTask, getTasks, updateTask, createTask } from "../api";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function refresh() {
        try {
            setError(null);
            const res = await getTasks();
             console.log("API response:", res.data); // 👀 Check shape
             setTasks(Array.isArray(res.data) ? res.data : res.data.tasks);
;        } catch(e: any) {
            setError(e?.message ?? "Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    }

    async function onAdd(task: Omit <Task, "id">) {
        try {
            await createTask(task);
            await refresh();
        } catch (e: any) {

        }
    }

    async function onToggle(task: Task) {
        await updateTask(task.id, task);
        await refresh();
        
    }

    async function onDelete(id: string | number) {
        await deleteTask(id);
        await refresh();
        
    }

    useEffect(() => { refresh() }, []);

    return(
        <div className="container">
            <div className="header">
                <h1> Task Manager</h1>
                <span className="badge">{tasks.length} tasks</span>
            </div>

            <TaskForm onAdd={onAdd} />

            <div className="panel">
                {loading && <div>Loading..</div>}
                {error && <div> {error} </div>}
                {!loading && !error && (
                    <div className="grid">
                        {tasks && tasks.map((t) => (
                            <TaskCard key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
                        ))}
                    </div>
                )

                }
            </div>

        </div>
    );
}