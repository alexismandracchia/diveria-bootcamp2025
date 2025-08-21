export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const STORAGE_KEY = "tasks";

export function getTasks(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(newTask: Task): void {
  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);
}

export function updateTask(updatedTask: Task): void {
  const tasks = getTasks().map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
}

export function deleteTask(taskId: string): void {
  const tasks = getTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
}
