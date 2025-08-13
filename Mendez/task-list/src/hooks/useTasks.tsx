// src/hooks/useTasks.js
import { useState, useEffect } from "react";
import { getTasks, addTask, deleteTask, updateTask } from '../components/TaskService';
import type { Task } from "../components/TaskService";

const generateId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Date.now().toString();

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      completed: false,
    };
    addTask(newTask);
    setTasks(getTasks()); 
  };

  const handleToggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
    setTasks(getTasks());
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    setTasks(getTasks()); 
  };

  return {
    tasks,
    handleAddTask,
    handleToggleComplete,
    handleDeleteTask,
  };
};