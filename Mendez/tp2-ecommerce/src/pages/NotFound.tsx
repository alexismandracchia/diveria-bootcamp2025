import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        color="primary"
        sx={{ fontWeight: "bold", fontSize: { xs: "6rem", sm: "8rem" } }}
      >
        404
      </Typography>

      <Typography variant="h4" sx={{ mb: 2 }}>
        ¡Oops! Página no encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        La página que buscas no existe o fue movida.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/")}
      >
        Volver al inicio
      </Button>

      <Box
        component="img"
        src="https://i.imgur.com/qIufhof.png"
        alt="404"
        sx={{ mt: 6, width: { xs: "80%", sm: "50%" }, maxHeight: 300 }}
      />
    </Container>
  );
}
