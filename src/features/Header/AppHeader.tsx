import { AppBar, Toolbar, Link, Typography, Box } from "@mui/material";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthSection } from "./AuthSection";


export function AppHeader() {
  const {  isAuthenticated } = useAuth0();
  return (
    <AppBar>
      <Toolbar>
        <CameraRollIcon sx={{ mr: 3 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The movies DB
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
            <HeaderLink to="/extra">Extra</HeaderLink>
            <HeaderLink to="/extra">Extra</HeaderLink>
            {isAuthenticated && <HeaderLink to="/protected">Protected</HeaderLink>}
            <HeaderLink to="/pokedex">Pokedex</HeaderLink>
          </nav>
        </Box>
        <AuthSection  />
      </Toolbar>
    </AppBar>
  );
}

function HeaderLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link component={RouterLink} to={to} variant="button" color="inherit" sx={{ my: 1, mx: 1.5 }}>
      {children}
    </Link>
  );
}




