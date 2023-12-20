import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { LoginPage } from './routes/LoginPage';
import { Layout } from './components/Layout';
import { SignUpPage } from './routes/SignUpPage';
import { AboutPage } from './routes/AboutPage';
import { NotFoundPage } from './routes/NotFoundPage';
import { NotePage /*, noteLoader*/ } from './routes/NotePage';
import { NotesPage } from './routes/NotesPage';
import { CreateNote } from './routes/CreateNote';
import { EditNote /*, editNoteLoader*/ } from './routes/EditNote';
import { AuthProvider } from './hoc/AuthProvider';
import { RequireAuth } from './hoc/RequireAuth';
import { ErrorPage } from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AboutPage />,
      },
      {
        path: 'about',
        element: <Navigate to='/' replace />,
      },
      {
        path: 'notes',
        element: <NotesPage />,
      },
      {
        path: 'notes/:id',
        element: <NotePage />,
        //loader: noteLoader,
      },
      {
        path: 'notes/:id/edit',
        element: <EditNote />,
        //loader: editNoteLoader,
      },
      {
        path: 'notes/new',
        element: <CreateNote />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
