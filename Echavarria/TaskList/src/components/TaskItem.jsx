import React from 'react';
import { 
  ListItem, 
  ListItemText,
  IconButton, 
  Checkbox,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskDescription from './TaskDescription';

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  return (
    <ListItem sx={{ alignItems: 'flex-start' }}>
      <Checkbox
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        color="primary"
        sx={{ mt: 0.5 }}
      />
      <Stack sx={{ flexGrow: 1 }}>
        <ListItemText
          primary={task.text}
          sx={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'text.secondary' : 'text.primary'
          }}
        />
        <TaskDescription description={task.description} />
      </Stack>
        <IconButton edge="end" onClick={() => deleteTask(task.id)}>
          <DeleteIcon color="error" />
        </IconButton>
    </ListItem>
  );
};

export default TaskItem;