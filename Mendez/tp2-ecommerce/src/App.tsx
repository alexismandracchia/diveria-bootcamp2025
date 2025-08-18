import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { routes } from './routes';
import { RootLayout } from './layout/RootLayout';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route key="layout" path="/" element={<RootLayout />}>
        {
          routes?.map(({ Element, path }) => (
            <Route key={path} path={path} element={<Element />} />
          ))
        }
      </Route>
      <Route path='*' element={<NotFound />}/>
    </>
  )
);

function App() {
  return <RouterProvider router={router}/>
}

export default App;
