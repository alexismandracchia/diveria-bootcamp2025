import { useState } from "react";
import '../styles/form.css';

interface TaskFormProps {
  addTask: (title: string, description: string) => void;
}

export function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask(title, description);

    setTitle("");
    setDescription("");
  };
  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <h2>Agregar tarea</h2>
      <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required/>
      <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      <button type="submit">Agregar</button>
    </form>
  );
}
