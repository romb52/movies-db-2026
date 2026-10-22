import { Alert, Avatar, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { useGetCharacterQuery } from "../../services/rickandmorty";

export function CharacterDetails({ id }: { id: number }) {
    const { data, isLoading, error } = useGetCharacterQuery(id);
    if (isLoading) {
        return <CircularProgress />;
    }
    if (error) {
        return <Alert severity="error">Error loading character details</Alert>;
    }
    if (!data) {
        return <Alert severity="info">Character not found</Alert>;
    }

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardContent>
                <Stack >
                    <Avatar
                        src={data.image}
                        alt={data.name}
                        sx={{ width: 160, height: 160 }}
                    />

                    <Typography variant="h5" component="h2">
                        {data.name}
                    </Typography>

                    <Typography>Status: {data.status}</Typography>
                    <Typography>Species: {data.species}</Typography>
                    <Typography>Gender: {data.gender}</Typography>
                    <Typography>ID: {data.id}</Typography>
                </Stack>
            </CardContent>

        </Card>
    )


}