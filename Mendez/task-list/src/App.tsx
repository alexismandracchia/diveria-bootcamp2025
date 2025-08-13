import { 
  Box, 
  Typography, 
  CssBaseline, 
  Container, 
  Button,
 } from "@mui/material";
import "./App.css";
import TaskList from "./components/TaskList";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "./components/general/CustomModal/CustomModal";
import { useModal } from "./hooks/useModal";
import ContainerCustomModal from "./components/general/CustomModal/ContainerCustomModal";
import TaskForm from "./components/TaskForm";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { isOpen, toggleModal } = useModal();
  const { 
    tasks, 
    handleAddTask, 
    handleToggleComplete, 
    handleDeleteTask 
  } = useTasks();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          color: "#fff",
        }}
        className="container_background"
      >
        <Container sx={{ height: "100vh", position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              py: 2,
            }}
          >
            <Box>
              <Typography variant="h1" sx={{ fontSize: "3rem" }}>
                Dashboard Events
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
              }}
            >
              <Typography variant="h5">List Events</Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={toggleModal}
              >
                Add Event
              </Button>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                overflow: "auto",
                py: 2,
              }}
            >
              <TaskList 
              tasks={tasks}
              onEdit={handleToggleComplete}
              onDelete={handleDeleteTask}
              />
            </Box>
          </Box>
          <CustomModal open={isOpen} handleModal={toggleModal}>
            <ContainerCustomModal
              header="Add Event Form"
            >
              <TaskForm handleModal={toggleModal} onSubmit={handleAddTask}/>
            </ContainerCustomModal>
          </CustomModal>
        </Container>
      </Box>
    </>
  );
}

export default App;
