import { useEffect, useState } from "react";
import ThemeToggle from "./components/themeToggle/themeToggle";
import Modal from "./components/modal/modal";
import CreateTask from "./components/createTask/createTask";
import TaskDetail from "./components/detailTask/detailTask";
import CircleEmptyIcon from "./assets/circleEmptyIcon";
import "./App.css";

import {
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type Task = {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"create" | "edit" | "detail" | "delete" | null>(null);

  const savedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(savedTasks ? JSON.parse(savedTasks) : []);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const openCreateTaskModal = () => {
    setModalContent("create");
    setIsModalOpen(true);
  };

  const openTaskDetailModal = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setModalContent("detail");
      setIsModalOpen(true);
    }
  };

  const opendeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setModalContent("delete");
    setIsModalOpen(true);
  };

  const deleteTask = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setSelectedTask(null);
  };

  const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prev) => [...prev, newTask]);
    closeModal();
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openEditTaskModal = (task: Task) => {
    setSelectedTask(task);
    setModalContent("edit");
    setIsModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    closeModal();
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <ThemeToggle />
        <h1>To-Do List</h1>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent === "create" && (
            <CreateTask onClose={closeModal} onCreate={handleCreateTask} />
          )}
          {modalContent === "edit" && selectedTask && (
            <CreateTask
              onClose={closeModal}
              onUpdate={handleUpdateTask}
              task={selectedTask}
            />
          )}
          {modalContent === "detail" && selectedTask && (
            <TaskDetail task={selectedTask} onClose={closeModal} />
          )}
          {modalContent === "delete" && taskToDelete && (
            <form>
              <h2>Eliminar tarea</h2>
              <p>
                ¿Estás seguro de que quieres eliminar la tarea:
                <br />
                <strong>"{taskToDelete.title}"</strong>?<br />
              </p>
              <strong style={{ color: "tomato", alignSelf: "center" }}>
                Esta acción es permanente y no se puede deshacer.
              </strong>
              <button onClick={deleteTask}>Eliminar</button>
              <button onClick={closeModal}>Cancelar</button>
            </form>
          )}
        </Modal>
      </header>

      <div className="task-container">
        <div className="tools-content">
          <PlusCircleIcon
            className="icon create-icon"
            onClick={openCreateTaskModal}
          />
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                className="div-content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`card ${
                          snapshot.isDragging ? "dragging" : ""
                        } ${task.completed ? "completed" : ""}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        onClick={() => openTaskDetailModal(task.id)}
                      >
                        {" "}
                        <div
                          className="drag-handle"
                          {...provided.dragHandleProps}
                          onClick={(e) => e.stopPropagation()}
                        >
                          ⋮⋮⋮⋮⋮⋮⋮
                        </div>
                        <div className="card-content">
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                        <div className="card-buttons">
                          <PencilIcon
                            className="icon update-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditTaskModal(task);
                            }}
                          />
                          <TrashIcon
                            className="icon delete-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              opendeleteModal(task);
                            }}
                          />
                          {task.completed ? (
                            <CheckCircleIcon
                              className="icon complete-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleComplete(task.id);
                              }}
                            />
                          ) : (
                            <CircleEmptyIcon
                              className="icon complete-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleComplete(task.id);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
