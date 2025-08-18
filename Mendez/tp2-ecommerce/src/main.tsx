import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Theme from './theme/Theme.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import "@fontsource/roboto/400.css"; 
import "@fontsource/roboto/500.css"; 
import "@fontsource/roboto/700.css"; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
