import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import type { ITaskFormProps } from "../types/taskTypes";

const TaskForm = ({ handleModal, onSubmit } : ITaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit(title.trim(), description.trim());
    handleModal(); 
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <TextField
        required
        fullWidth
        id="standard-basic"
        label="Title"
        variant="standard"
        margin="normal"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        required
        fullWidth
        id="standard-basic"
        label="Description"
        variant="standard"
        margin="normal"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box 
      mt={3}
      sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Button variant="outlined" color="error" onClick={handleModal}>Cancel</Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
      </Box>
    </>
  );
};

export default TaskForm;
