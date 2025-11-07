# 🧩 Fullstack CRUD App (Express + TypeScript + React)

A simple **full-stack CRUD application** demonstrating a Node.js + Express backend (with TypeScript and file-based storage) and a frontend built with React.  
Perfect for learning, demos, or as a boilerplate for small projects.

------

## 📂 Project Structure

![alt text](image.png)


--------


## ⚙️ Prerequisites

- Node.js ≥ **16.x**
- npm or yarn
- (Optional) `ts-node` and `nodemon` for development

---

## 🚀 Backend Setup & Run

1. **Open the backend folder**
   
   cd backend


2. Install dependencies

npm install


3. Run in development mode

npm run dev


Requires ts-node and nodemon (installed via devDependencies)

4. Build & run in production

npm run build
npm start


🟢 The backend starts at http://localhost:5000

---------------

Frontend Setup & Run

2. Open the frontend folder

cd frontend


2. Install dependencies

npm install


3. Start the frontend

npm start


4. The frontend usually runs at http://localhost:3000
 and communicates with the backend via http://localhost:5000/api.

----------------

 🧠 API Endpoints

Method	Endpoint	Body (JSON)	Description

GET	/api/tasks	—	Fetch all tasks

POST	/api/tasks	{ "title": "Task", "description": "desc", "completed": false }	Create new task

PUT	/api/tasks/:id	{ "title": "Updated", "completed": true }	Update an existing task

DELETE	/api/tasks/:id	—	Delete task by ID


All tasks are persisted in backend/db.json:

{
  "tasks": [
    {
      "id": "uuid-string",
      "title": "Example",
      "description": "Task description",
      "completed": false
    }
  ]
}

------------

🧩 Sample curl Requests

Create

curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Demo task","completed":false}'


Get All

curl http://localhost:5000/api/tasks


Update

curl -X PUT http://localhost:5000/api/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'


Delete

curl -X DELETE http://localhost:5000/api/tasks/<TASK_ID>

----------

🧱 Scripts to Add

backend/package.json

"scripts": {
  "dev": "nodemon --watch src --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}


frontend/package.json

"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test"
}


---------

📜 License

This project is licensed under the MIT License — you’re free to modify and distribute it.
