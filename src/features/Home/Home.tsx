import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Stack, Typography } from "@mui/material";
import { anonymousUser, AuthContext } from "../../AuthContext";
import { useContext } from "react";


export function Home() {
    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;
    const greeting = loggedIn ? `${auth.user.name}, explore movies today with us!` : "Explore movies today with us!"

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