import {
  CardContent,
  Typography,
  CardActions,
  Card,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";
import type { ITaskItemProps } from "../types/taskTypes";

const TaskItem = ({
  title,
  description,
  completed,
  onEdit,
  onDelete,
}: ITaskItemProps) => {
  return (
    <Card
    sx={{
      minWidth: 150,
      bgcolor: completed ? 'grey.300' : 'background.paper',
    }}
    className="taskItem_container"
  >
    <CardContent>
      <Typography
        variant="h5"
        component="div"
        sx={{
          textDecoration: completed ? 'line-through' : 'none',
          opacity: completed ? 0.5 : 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          textDecoration: completed ? 'line-through' : 'none',
          opacity: completed ? 0.5 : 1,
        }}
      >
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton size="small" color="success" onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton size="small" color="error" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
  );
};

export default TaskItem;
