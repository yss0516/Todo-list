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
    { id: 1, title: "Go walk", description: "Go walk at 12:00" },
    { id: 2, title: "Go grocery", description: "Go to grocery at 13:00" },
];

app.get("/api/todos", (req, res) => {
    res.json(todos);
})

app.get("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const foundTodo = todos.find((todo) => todo.id === id );
    res.json(foundTodo);
})

app.post("/api/todos", (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "There is no task" });
    const newTodo = {
        id: todos.length + 1,
        title,
        description,
    }
    todos.push(newTodo);
    res.json(newTodo);
})

app.patch("/api/todos/:id", (req, res) => {
    const { title, description } = req.body;
    const foundTodo = todos.find(todo => todo.id === parseInt(req.params.id));

    if (!foundTodo) return res.status(404).json({ message: "Todo not found" });
    if (title) foundTodo.title = title;
    if (description) foundTodo.description = description;

    res.json(foundTodo);
})

app.delete("/api/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: "Delete complited" });
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})