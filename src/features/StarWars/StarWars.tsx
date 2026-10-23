import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Alert, Container, LinearProgress, Typography } from "@mui/material";


type StarWarsFilmsVariables = Record<string, never>;

const GET_STAR_WARS_FILMS: TypedDocumentNode<
StarWarsFilmsResponse,
StarWarsFilmsVariables
> = gql`
  query GetStarWarsFilms {
    allFilms {
      films {
        title
        episodeID
        releaseDate
        director
        openingCrawl
      }
    }
  }
`;

interface StarWarFilm {
  title: string;
  episodeID: number;
  releaseDate: string;
  director: string;
  openingCrawl: string;
}

interface StarWarsFilmsResponse {
  allFilms: {
    films: StarWarFilm[];
  };
}

export default function StarWars() {
  const { data, loading, error } = useQuery(GET_STAR_WARS_FILMS);

  if (loading) {
    return <LinearProgress/>
  }

  if (error) {
    return <Alert severity="error" sx={{ py: 9 }} >Помилка: {error.message}</Alert >;
  }

  const films = data?.allFilms.films ?? [];

  return (
    <Container sx={{ py: 9 }} maxWidth="xl">
      <h1>Фільми Star Wars</h1>
      {films.map((film) => (
        <article key={film.episodeID}>
          <Typography variant="h5" component="h2">
            Епізод {film.episodeID} : {film.title}
          </Typography>

          <Typography>Режисер: {film.director}</Typography>
          <Typography>Дата виходу: {film.releaseDate} </Typography>
          <Typography> {film.openingCrawl} </Typography>
        </article>
      ))}
    </Container>
  );
}
