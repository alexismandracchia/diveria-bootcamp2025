import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './routes/AppLayout';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <SearchPage /> },
            { path: 'items', element: <ResultsPage /> },
            { path: 'items/:id', element: <ProductDetailPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);

export default router;