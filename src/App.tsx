import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  useRouteError,
  useLocation,
  useNavigate,
  RouteObject,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header'; // Make sure this path is correct
import Home from './pages/Home';
import Hospital from './pages/Hospital';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const Shell: React.FC = () => {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  );
};

const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.message || String(error)}</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Shell />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ':hospital',
        children: [
          { index: true, element: <Hospital /> },
          { path: ':app', element: <Hospital /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
              errorElement={route.errorElement}
            >
              {route.children?.map((childRoute) =>
                childRoute.index ? (
                  <Route key="index" index element={childRoute.element} />
                ) : (
                  <Route
                    key={childRoute.path}
                    path={childRoute.path}
                    element={childRoute.element}
                  >
                    {childRoute.children?.map((grandChildRoute) =>
                      grandChildRoute.index ? (
                        <Route
                          key="index"
                          index
                          element={grandChildRoute.element}
                        />
                      ) : (
                        <Route
                          key={grandChildRoute.path}
                          path={grandChildRoute.path}
                          element={grandChildRoute.element}
                        />
                      )
                    )}
                  </Route>
                )
              )}
            </Route>
          ))}
        </Routes>
      </Router>
      </HelmetProvider>
  );
};

export default App;