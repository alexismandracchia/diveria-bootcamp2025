import { Container, Grid } from "@mui/material";
import TaskItem from "./TaskItem";
import type { ITaskListProps } from "../types/taskTypes";

const TaskList = ({ tasks, onEdit, onDelete }: ITaskListProps) => {
  return (
    <>
      <Container sx={{ height: "100%" }}>
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <TaskItem
                title={task.title}
                description={task.description}
                completed={task.completed}
                onEdit={() => onEdit(task.id)}
                onDelete={() => onDelete(task.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TaskList;
