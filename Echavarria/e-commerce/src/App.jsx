import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResult';
import ProductDetail from './pages/ProductDetail';

const theme = createTheme ({
  palette:{
    primary:{
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/items" element={<SearchResults/> } />
          <Route path="/items/:id" element={<ProductDetail/> } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
