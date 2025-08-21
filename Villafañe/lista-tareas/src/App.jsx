import { useEffect, useMemo, useState, useCallback } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const STORAGE_KEY = "tasks_material_v1";
const uid = () =>
  (globalThis.crypto && typeof crypto.randomUUID === "function")
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(({ name, description, dueDate, priority }) => {
    const cleanName = name.trim();
    if (!cleanName) return;
    setTasks(prev => [
      ...prev,
      {
        id: uid(),
        name: cleanName,
        description: (description || "").trim(),
        dueDate: dueDate || null,         
        priority: Number(priority) || 4,   
        completed: false,
        createdAt: new Date().toISOString(),
      }
    ]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const sortedTasks = useMemo(() => {
    const toTime = d => (d ? new Date(d + "T00:00:00").getTime() : Infinity);
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const byDate = toTime(a.dueDate) - toTime(b.dueDate);
      if (byDate !== 0) return byDate;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }, [tasks]);

  const remaining = tasks.filter(t => !t.completed).length;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="title">Mis Tareas</h1>
        <p className="subtitle">
          {remaining === 0 ? "¡Todo al día!" : `${remaining} pendiente(s)`} · {tasks.length} total
        </p>
      </header>

      <section className="card">
        <h2 className="card__title">Nueva tarea</h2>
        <TaskForm onAdd={addTask} />
      </section>

      <section className="card">
        <h2 className="card__title">Lista</h2>
        <TaskList tasks={sortedTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </section>
    </div>
  );
}
