import { useState, useEffect } from "react";

type CreateTaskProps = {
  onClose: () => void;
  onCreate?: (task: { title: string; description: string }) => void;
  onUpdate?: (task: { id: number; title: string; description: string; completed?: boolean }) => void;
  task?: { id: number; title: string; description?: string; completed?: boolean };
};

export default function CreateTask({ onClose, onCreate, onUpdate, task }: CreateTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (task && onUpdate) {
      onUpdate({
        id: task.id,
        title: title.trim(),
        description: description.trim(),
        completed: task.completed
      });
    } else if (onCreate) {
      onCreate({ title: title.trim(), description: description.trim() });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{task ? "Editar tarea" : "Crear nueva tarea"}</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">{task ? "Actualizar" : "Guardar"}</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
}
