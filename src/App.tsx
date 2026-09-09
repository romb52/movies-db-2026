import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, CssBaseline, Toolbar, Link, createTheme, Typography, Box } from '@mui/material';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import { ThemeProvider } from '@emotion/react';
import { teal } from '@mui/material/colors';



function HeaderLink({ children, to }: { children: React.ReactNode, to: string }) {
  return <Link component={RouterLink} to={to} variant='button' color='inherit' sx={{ my: 1, mx: 1.5 }}>{children}</Link>;
}

const defaultTheme = createTheme(
  {palette: {
    primary: teal,
    secondary: {main: "#96000f"}
  }}
)

function App() {
  return (
    <ThemeProvider theme={defaultTheme} >
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <CameraRollIcon sx={{ mr: 3 }} />
          <Typography variant='h6' color='inherit' noWrap >The movies DB</Typography>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar >
      <Box component="main">
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
