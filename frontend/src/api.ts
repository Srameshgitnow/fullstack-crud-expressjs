import axios from "axios";

import { Task } from "./types";

interface TaskLisReponse {
    tasks: Task[];
}

const BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api/tasks";

export const getTasks = () => axios.get<TaskLisReponse>(BASE);

export const createTask = (task: Pick<Task, "title" | "description">) => 
    axios.post<Task>(BASE, task);

export const updateTask = (id: string | number, task: Partial<Task>) =>
    axios.put<Task>(`${BASE}/${id}`, task);

export const deleteTask= (id: string | number) => 
    axios.delete(`${BASE}/${id}`);

