import { useEffect, useRef, useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import './App.css';

const STORAGE_KEY = 'tasks';

export default function App() {
  const [Tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved ? JSON.parse(saved) : [];
    return initial.map(t => ({
      id: t.id ?? crypto.randomUUID(),
      title: t.title ?? t.name ?? '',
      description: t.description ?? '',
      completed: !!t.completed,
      createdAt: t.createdAt ?? Date.now(),
    }));
  });

  const [message, setMessage] = useState('');
  const didMount = useRef(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Tasks));
    if (didMount.current) {
      setMessage(`Lista Actualizada. Tareas: ${Tasks.length}`);
      const t = setTimeout(() => setMessage(''), 1200);
      return () => clearTimeout(t);
    } else {
      didMount.current = true;
    }
  }, [Tasks]);

  const addTask = ({title, description }) => {
    const cleanTitle = title.trim();
    const cleanDesc = (description ?? '').trim();

    if (!cleanTitle) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      description: cleanDesc,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  };
  
  const toggleTask = (id) => {
    setTasks(prev => 
      prev.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };
  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };
  const editTask = (id, newTitle, newDesc) => {
    setTasks (prev =>
      prev.map(t => 
        t.id === id ? {...t, title: newTitle.trim(), description: newDesc.trim()} : t
      )
    );
  };

  const completedCount = Tasks.filter(t => t.completed).length;

  return (
    <div className="container">
      <h1>Mis Tareas</h1>
      {message && <div className="flash">{message}</div>}

      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={Tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      <footer className="footer">
        <span>Total: {Tasks.length}</span>
        <span>Completadas: {completedCount}</span>
        <button className="btn btn-clear" onClick={clearCompletedTasks}>Eliminar Completadas
        </button>
      </footer>
    </div>
  );
}
