import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Alert, Card, CardContent, CardMedia, Container, Grid, LinearProgress, Typography } from "@mui/material";
import { useState } from "react";

type PokemonVariables = Record<string, never>;
// interface PokemonVariables {
//   limit: number;
//   offset: number;
// }

const GET_POKEMON: TypedDocumentNode<PokemonResponse, PokemonVariables> = gql`
  query GetPokemon {
    pokemon {
      id
      name
      height
    }
  }
`;

interface Pokemon {
  id: number;
  name: string;
  height: number;
}

interface PokemonResponse {
  pokemon: Pokemon[];
}

export default function Pokedex() {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useQuery(GET_POKEMON);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ py: 9 }}>
        Error: {error.message}
      </Alert>
    );
  }

  const pokemons = data?.pokemon ?? [];

  return (
    <Container sx={{ py: 9 }} maxWidth="xl">
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Pokédex
      </Typography>

      <Grid container spacing={3}>
        {pokemons.map((pokemon) => (
          <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card>
              <CardMedia
                component="img"
                //image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                  mx: "auto",
                }}
              />

              <CardContent>
                <Typography variant="h6" component="h2">
                  {pokemon.name}
                </Typography>

                <Typography color="text.secondary">ID: {pokemon.id}</Typography>

                <Typography color="text.secondary">Height: {pokemon.height}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
