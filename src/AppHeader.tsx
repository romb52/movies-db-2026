import { AppBar, Toolbar, Link, Typography, Button, Box } from "@mui/material";
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from "react";
import { anonymousUser, AuthContext } from "./AuthContext";


interface AppHeaderProps{
    onLogin(): void;
    onLogout(): void;
}

export function AppHeader({onLogin, onLogout} : AppHeaderProps) {
    return (
        <AppBar >
            <Toolbar>
                <CameraRollIcon sx={{ mr: 3 }} />
                <Typography variant='h6' color='inherit' noWrap >The movies DB</Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <nav>
                        <HeaderLink to="/">Home</HeaderLink>
                        <HeaderLink to="/movies">Movies</HeaderLink>
                        <HeaderLink to="/about">About</HeaderLink>
                    </nav>
                </Box>
                <AuthSection onLogin={onLogin}  onLogout={onLogout}/>
            </Toolbar>
        </AppBar >
    );
}

interface AuthSectionProps{
    onLogin(): void;
    onLogout(): void;
}

function AuthSection({onLogin, onLogout} : AuthSectionProps) {
   const auth = useContext(AuthContext); 
   const loggedIn = auth.user !== anonymousUser;

    if (loggedIn){
       return <>
        <Typography>Hello, {auth.user.name} !</Typography>
        <Button variant="contained" sx={{ml: 2}} onClick={onLogout}>Log out</Button>
        </>
    }
    return <Button variant="contained" onClick={onLogin}>Log in</Button>
}

function HeaderLink({ children, to }: { children: React.ReactNode, to: string }) {
    return <Link component={RouterLink} to={to} variant='button' color='inherit' sx={{ my: 1, mx: 1.5 }}>{children}</Link>;
}