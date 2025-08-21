export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface ITaskListProps {
  tasks: ITask[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface ITaskItemProps {
  title: string;
  description: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ITaskFormProps {
  handleModal: () => void;
  onSubmit: (title: string, description: string) => void;
};