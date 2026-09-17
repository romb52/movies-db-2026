import { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { CssBaseline, createTheme, Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { teal } from '@mui/material/colors';
import { AppHeader } from "./AppHeader"
import { AuthContext, AuthInfo, anonymousUser } from './AuthContext';


const defaultTheme = createTheme(
  {
    palette: {
      primary: teal,
      secondary: { main: "#96000f" }
    }
  }
);

const fakeAuth : AuthInfo={
  user:{
    name: "Albert"
  }
}

function App() {
const [auth, setAuth] = useState<AuthInfo>({user: anonymousUser});


  return (
    <ThemeProvider theme={defaultTheme} >
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <AppHeader onLogin={()=> setAuth (fakeAuth)} onLogout={()=> setAuth({user: anonymousUser})} />
        <Box component="main">
          <Outlet />
        </Box>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
