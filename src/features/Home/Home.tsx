import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Stack, Typography } from "@mui/material";


export function Home() {
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
                Explore movies today with us!
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