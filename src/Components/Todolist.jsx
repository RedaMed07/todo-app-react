import { useEffect, useState } from "react";
import "./Todolist.css";

export default function Todolist() {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [tag, setTag] = useState("");
  const [counter, setCounter] = useState(1);

  // Load tasks and counter from localStorage
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("my-tasks");
      const savedCounter = localStorage.getItem("task-counter");

      if (savedTasks) {
        setTask(JSON.parse(savedTasks));
      }
      if (savedCounter) {
        setCounter(parseInt(savedCounter, 10));
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever the task list changes
  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(task));
  }, [task]);

  // Add a new task
  function handleClick() {
    if (input.trim() !== "") {
      const newTask = { id: counter, name: input, tag: tag };
      setTask([...task, newTask]);

      const updatedCounter = counter + 1;
      setCounter(updatedCounter);
      localStorage.setItem("task-counter", updatedCounter.toString());

      setInput("");
      setTag("");
    }
  }

  // Delete a task
  function handleDelete(id) {
    const newTask = task.filter((task) => task.id !== id);
    setTask(newTask);
  }

  const taskList = task.map((task) => (
    <li key={task.id}>
      {task.name} <span className="tag">{task.tag}</span>
      <button className="deleteBtn" onClick={() => handleDelete(task.id)}>🗑</button>
    </li>
  ));

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Todo</h2>
        {task.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          <ul>{taskList}</ul>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="name">Task:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tag">Tag:</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <div className="input-group">
        <button className="btn-add" onClick={handleClick}>
          Ajouter
        </button>
      </div>
    </div>
  );
}
