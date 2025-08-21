
type Task = {
  id: number;
  title: string;
  description?: string;
};

type TaskDetailProps = {
  task: Task;
  onClose: () => void;
};

export default function TaskDetail({ task, onClose }: TaskDetailProps) {
  return (
    <>
      <h2>{task.title}</h2>
      <p className="card">{task.description}</p>
      <button onClick={onClose}>Cerrar</button>
    </>
  );
}
