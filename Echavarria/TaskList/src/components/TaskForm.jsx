import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TaskForm = ({ addTask }) => {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input, description);
      setInput('');
      setDescription('');
    }
  };

  return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Nueva tarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Agregar
          </Button>
        </Box>
  );
};

export default TaskForm;