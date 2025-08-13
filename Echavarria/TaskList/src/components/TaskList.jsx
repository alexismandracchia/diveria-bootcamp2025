import React from 'react';
import { List, Typography, Grid} from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <>
      {tasks.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No hay tareas. ¡Agrega una!
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default TaskList;