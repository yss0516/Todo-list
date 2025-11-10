import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [
    { id: 1, task: "Go walk" },
    { id: 2, task: "Go grocery" },
];

app.get("/api/todos", (req, res) => {
    res.json(todos);
})

app.post("/api/todos", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "There is no task" });
    const newTodo = {
        id: todos.length + 1,
        task,
    }
    todos.push(newTodo);
    res.json(newTodo);
})

app.delete("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: "Delete complited" });
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})