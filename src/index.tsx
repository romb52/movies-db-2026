import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About } from './features/About/About';
import Movies from './features/Movies/Movies';
import { Provider } from 'react-redux';
import store from './store';
import { MovieDetails } from './features/Movies/MovieDetails';
import { Home } from './features/Home/Home';
import { ErrorBoundary } from 'react-error-boundary';
//import { ErrorBoundary } from './ErrorBoundary';


function AppEntrypoint (){
  return <Provider store={store}>
    <ErrorBoundary fallback= {<h2>Oops! Something weny wrong...</h2>}><App /></ErrorBoundary>
    </Provider>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppEntrypoint/>,
    //element: <Provider store={store}><App /></Provider>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
