import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Button, IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserSettingsMenu } from "./UserSettingsMenu";
import { useNavigate } from "react-router-dom";

export function AuthSection() {

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/"
      }
    });
  }

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  if (isAuthenticated && user) {
    return (
      <>
        <Typography>Hello, {user?.name} !</Typography>
       <UserSettingsMenu user={user} onLogout={handleLogout} onOpenProfile={() => navigate("/profile")} />
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
    <Button variant="contained" onClick={handleLogin}>
      Log in
    </Button>
  );
}

