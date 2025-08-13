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
  const [modalContent, setModalContent] = useState<
    "create" | "edit" | "detail" | "delete" | null
  >(null);

  const savedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    savedTasks ? JSON.parse(savedTasks) : []
  );

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //modals
  const openCreateTaskModal = () => {
    setModalContent("create");
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    setSelectedTask(task);
    setModalContent("edit");
    setIsModalOpen(true);
  };

  const openDeleteTaskModal = (task: Task) => {
    setSelectedTask(task);
    setModalContent("delete");
    setIsModalOpen(true);
  };

  const openTaskDetailModal = (task: Task) => {
    setSelectedTask(task);
    setModalContent("detail");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setSelectedTask(null);
  };

  //task management
  const handleCreateTask = (task: Omit<Task, "id">) => { //recibe el objeto omitiendo el id
    const newTask = { ...task, id: Date.now(), completed: false };
    setTasks((prev) => [...prev, newTask]);
    closeModal();
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    closeModal();
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
      setSelectedTask(null);
      closeModal();
    }
  };

  const handleCompleteTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //dnd
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
          {modalContent === "delete" && selectedTask && (
            <form>
              <h2>Eliminar tarea</h2>
              <p>
                ¿Estás seguro de que quieres eliminar la tarea:
                <br />
                <strong>"{selectedTask.title}"</strong>?<br />
              </p>
              <strong style={{ color: "tomato", alignSelf: "center" }}>
                Esta acción es permanente y no se puede deshacer.
              </strong>
              <button onClick={handleDeleteTask}>Eliminar</button>
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
                        onClick={() => openTaskDetailModal(task)}
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
                              openDeleteTaskModal(task);
                            }}
                          />
                          {task.completed ? (
                            <CheckCircleIcon
                              className="icon complete-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteTask(task.id);
                              }}
                            />
                          ) : (
                            <CircleEmptyIcon
                              className="icon complete-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteTask(task.id);
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
