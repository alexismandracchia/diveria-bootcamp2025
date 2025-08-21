import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Email, Phone, LocationOn, Favorite } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
          {/* Sección de Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 1 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1 }} />
              </Box>
            </Box>
          </Grid>

          {/* Sección de Enlaces Rápidos */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Link sx={{ marginRight: 3 }} href="/" color="inherit" underline="hover" display="block" mb={1}>
                Inicio
              </Link>
              <Link sx={{ marginRight: 3 }} href="/nosotros" color="inherit" underline="hover" display="block" mb={1}>
                Nosotros
              </Link>
              <Link sx={{ marginRight: 3 }} href="/productos" color="inherit" underline="hover" display="block" mb={1}>
                Productos
              </Link>
              <Link sx={{ marginRight: 3 }} href="/contacto" color="inherit" underline="hover" display="block">
                Contacto
              </Link>
            </Box>
          </Grid>
        </Grid>
        {/* Sección de Derechos */}
        <Grid item xs={12} md={4}>
          <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Todos los derechos reservados
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Desarrollado con cariño
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;