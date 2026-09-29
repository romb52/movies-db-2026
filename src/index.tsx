import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import React, { Profiler, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import store from './store';
const About = lazy(() => import('./features/About/About'));
const Movies = lazy(() => import('./features/Movies/Movies'));
const MovieDetails = lazy(() => import('./features/Movies/MovieDetails'));
const Home = lazy(() => import('./features/Home/Home'));

//import { ErrorBoundary } from './ErrorBoundary';


function AppEntrypoint() {
  return <Provider store={store}>
    <ErrorBoundary fallback={<h2>Oops! Something weny wrong...</h2>}><App /></ErrorBoundary>
  </Provider>
}

function onRender(
  id: string,
  phase: "mount" | "update" | "nested-update",
  actualDuration: number
) {
  console.log({
    id,
    phase,
    actualDuration,
  })
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppEntrypoint />,
    //element: <Provider store={store}><App /></Provider>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: (<Profiler id="About" onRender={onRender}><About /></Profiler>)
      },
      {
        path: "/movies",
        element: <Movies />
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />
      },
    ]
  },

])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<h2> Loading...</h2>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
