import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {

  const [tasks, setTasks] = useState([]);

  // Cargar al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem('task-data');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Guardar cuando cambian
  useEffect(() => {
    localStorage.setItem('task-data', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, description) => {
    const newTask = {
      id: Date.now(),
      text,
      description,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  //filtramos el id, creamos un nuevo array sin la tarea especificada
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ border: '1px solid #0000005d',borderRadius: 2, p:2, mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Tareas
      </Typography>
      <Grid container spacing={2}>
        <Grid size={5} sx={{ border: '1px solid #0000005d', borderRadius: 2, p:2}}>
          <TaskForm addTask={addTask}/>
        </Grid>
        <Grid size={7} sx={{ border: '1px solid #0000005d', borderRadius: 2, p:2}} >
          <TaskList 
            tasks={tasks} 
            toggleTask={toggleTask} 
            deleteTask={deleteTask} 
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App

// import React, { useState, useEffect } from 'react';
// import './App.css'

// const App = () => {

//   const [task, setTask] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const savedTaskData = localStorage.getItem("task-data");

//     if(savedTaskData){
//       setTask(JSON.parse(savedTaskData));
//     } else {
//       localStorage.setItem("task-data", JSON.stringify([]));
//     }
//   },[]);

//   const addNewTask = () => {
//     const newTask = {text: input, complete: false}
//     const updateTaskList = [...task, newTask];
//     setTask(updateTaskList);
//     localStorage.setItem("task-data", JSON.stringify(updateTaskList));
//     setInput("");
//   }

//   const completeTask = (index) => {
//     const updatedTasks = [...task];
//     updatedTasks[index].complete = !updatedTasks[index].complete;
//     setTask(updatedTasks);
//     localStorage.setItem("task-data", JSON.stringify(updatedTasks))
//   }

//   const deleteTask  = (index) => {
//     const updatedTasks = [...task];
//     updatedTasks.splice(index, 1);
//     setTask(updatedTasks);
//     localStorage.setItem("task-data", JSON.stringify(updatedTasks));
//   }
//   return (
//     <div>
//       <input value={input} type="text" onChange={(e) => {setInput(e.target.value)}} />
//       <button onClick={() => {addNewTask()}}>Añadir</button>
//       <hr />

//       <div>
//         {task.length > 0 ? (
//           <div>
//             <ol>
//               {task.map((task, index) => (
//                 <div key={index} style={{display:'flex'}}>
//                   <p>{task.text}</p>
//                   <button onClick={() => deleteTask(index)}>🗑️</button>
//                   <button onClick={() => completeTask(index)} key={index}>{task.complete ? "✅" : "❌"}</button>
//                 </div>
//               ))}
//             </ol>
//           </div>
//           ) : (
//           <p>Agrega una nueva tarea</p>
//         )}
//       </div>
//     </div>
//   )
// }

//export default App