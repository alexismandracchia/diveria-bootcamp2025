import React, { useState } from 'react';
import { Collapse, Typography, IconButton, Paper, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TaskDescription = ({ description }) => { //prop
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mt: 1 }}>
      <IconButton
        size="small"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="Mostrar descripción"
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography variant="caption" sx={{ ml: 1 }}>
          {expanded ? 'Ocultar' : 'Ver descripción'}
        </Typography>
      </IconButton>
      <Collapse in={expanded}>
        <Paper elevation={0} sx={{ p: 2, mt: 1, bgcolor: 'background.default' }}>
          <Typography variant="body2">
            {description || 'No hay descripción para esta tarea.'}
          </Typography>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default TaskDescription;