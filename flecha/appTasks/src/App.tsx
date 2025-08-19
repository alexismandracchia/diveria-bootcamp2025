import "./App.css";
import type { Task } from "./components/task";
import { TaskForm } from "./components/taskForm";
import { TaskList } from "./components/taskList";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasksList(JSON.parse(savedTasks));
    } 
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList, isInitialized]);

  const addTask = (title: string, description: string) => {
    const idTask = tasksList.length > 0 ? tasksList[tasksList.length - 1].id + 1 : 1;
    const newTask : Task = {id: idTask, title, description, completed: false};
    setTasksList([...tasksList, newTask]);
  };

  const deleteTask = (index: number) => {
    const newTasksList = tasksList.filter((_, i) => i !== index);
    setTasksList(newTasksList);
  };

  const completeTask = (index: number) => {
    const newTasksList = tasksList.map((task, i) => {
      if (i === index) {
        task.completed = !task.completed;
        if (task.completed) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 7000);
        }
      }
      return task;
    });
    setTasksList(newTasksList);
  };

  return (
    <main>
      {showConfetti && (
        <Confetti
          numberOfPieces={300} 
          gravity={0.8} 
          wind={0.02}
          recycle={false}
        />
      )}
      <TaskForm addTask={addTask} />
      <TaskList
        tasksList={tasksList}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    </main>
  );
}

export default App;
