import { AppBar, Toolbar, Link, Typography, Button, Box, IconButton, Tooltip } from "@mui/material";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { anonymousUser, AuthContext } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

interface AppHeaderProps {
  onLogin(): void;
  onLogout(): void;
}

export function AppHeader({ onLogin, onLogout }: AppHeaderProps) {
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
            <HeaderLink to="/star-wars">Star Wars</HeaderLink>
            <HeaderLink to="/pokedex">Pokedex</HeaderLink>
          </nav>
        </Box>
        <AuthSection  />
      </Toolbar>
    </AppBar>
  );
}



function AuthSection() {

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/"
      }
    });
  }

  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  if (isAuthenticated) {
    return (
      <>
        <Typography>Hello, {user?.name} !</Typography>
        <Button variant="contained" sx={{ ml: 2 }} onClick={onLogout}>
          Log out
        </Button>
        <Tooltip title="Favorites">
          <IconButton
            component={RouterLink}
            to="/favorites" sx={{ ml: 1 }}
            color="inherit"
            aria-label="Favorites"
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  }
  return (
    <Button variant="contained" onClick={onLogin}>
      Log in
    </Button>
  );
}

function HeaderLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link component={RouterLink} to={to} variant="button" color="inherit" sx={{ my: 1, mx: 1.5 }}>
      {children}
    </Link>
  );
}
