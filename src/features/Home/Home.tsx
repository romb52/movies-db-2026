import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";


export default function Home() {
    const {user, isAuthenticated} = useAuth0();
    
    const greeting = isAuthenticated ? `${user?.name}, explore movies today with us!` : "Explore movies today with us!"

   
   //throw new Error ("Fuckupp!");
   
    return (
        <Container sx={{ py: 8 }}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Welcome
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                component="p"
            >
                 {greeting}  
            </Typography>
            <Stack
                sx={{ pt: 4, justifyContent: "center" }}
                direction="row"
                spacing={2}
            >
                <Button component={RouterLink} to={`/movies`}> EXPLORE</Button>
            </Stack>
        </Container>
    )
}