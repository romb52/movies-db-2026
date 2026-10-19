import { Avatar, Box, Card, CardContent, Container, Typography } from "@mui/material";
import { Episode } from "../../services/rickandmorty";

export function EpisodeCard({ name, episode, air_date, characters }: Episode) {
  return (
    <Card sx={{ width: "100%", maxWidth: 400, py: 9 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {name}
        </Typography>

        <Typography color="text.secondary">Episode: {episode}</Typography>

        <Typography color="text.secondary">Air date: {air_date}</Typography>

        <Typography sx={{ mt: 2 }} variant="h6">
          Characters ({characters.length})
        </Typography>

        <Box
          sx={{
            maxHeight: 240,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {characters.map((character) => (
            <Box
              key={character.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 1,
              }}
            >
              <Avatar src={character.image} alt={character.name} />
              <Typography>{character.name}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
