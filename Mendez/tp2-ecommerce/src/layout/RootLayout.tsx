import { Outlet } from "react-router-dom";
import Navbar from "../components/general/navbar/Navbar";
import { Box, Container } from "@mui/material";
import "../App.css";

export function RootLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className={"background"}>
      <Navbar />
      <Container maxWidth="lg" component="main"  sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 0, sm: 2 }, 
          width: { xs: '100%', sm: 'auto' }, 
          marginTop: 9
        }}>
        <Outlet />
      </Container>
    </Box>
  )
}