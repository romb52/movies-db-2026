import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { CssBaseline, createTheme, Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { teal } from '@mui/material/colors';
import { AppHeader } from "./AppHeader"
import { AuthContext } from './AuthContext';





const defaultTheme = createTheme(
  {
    palette: {
      primary: teal,
      secondary: { main: "#96000f" }
    }
  }
)

function App() {
  return (
    <ThemeProvider theme={defaultTheme} >
      <CssBaseline />
      <AuthContext.Provider value={{ user: { name: "Den" } }}>
        <AppHeader />
        <Box component="main">
          <Outlet />
        </Box>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
