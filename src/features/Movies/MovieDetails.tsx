//import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import { RootState } from "../../store";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import { useGetConfigurationQuery, useGetMovieDetailsQuery } from "../../services/tmdb";

export default function MovieDetails() {
  const { id } = useParams();
  const movieId = Number(id);
  // const movies = useSelector(
  //     (state: RootState) => state.movies.top
  // );

  // const movie = movies.find(
  //     (movie) => movie.id === Number(id)
  // );
  const { data: movie, isLoading } = useGetMovieDetailsQuery(Number(id));

  const { data: configuration } = useGetConfigurationQuery();

const image = movie?.poster_path && configuration
  ? `${configuration.images.base_url}w780${movie.poster_path}`
  : undefined;



  if (isLoading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (!movie) {
    return <Typography variant="h4">Movie not found</Typography>;
  }

  return (
    <Container
      sx={{
        maxWidth: "1000px",
        my: 4,
        py: 8,
        display: "flex",
        gap: {
          xs: 2,
          md: 4,
        },
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "center",
          md: "stretch",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "40%",
          },
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="div"
          image={image}
          sx={{
            pt: "56.25%",
            width: "100%",
            borderRadius: 1,
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          width: {
            xs: "100%",
            md: "auto",
          },
        }}
      >
        <Typography variant="h3" gutterBottom>
          {movie.title}
        </Typography>

        <Typography sx={{ mb: 3 }}>Popularity: {movie.popularity}</Typography>

        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Overview
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {movie.overview}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
