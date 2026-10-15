import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { MovieCard } from "../Movies/MovieCard";
import { useGetConfigurationQuery, useGetFavoriteQuery } from "../../services/tmdb";
import { useCallback, useContext, useState } from "react";
import { AuthContext, anonymousUser } from "../../AuthContext";
import configuration from "../../configuration";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

function Favorites() {
  const [favoriteMoviesQuery, setFavoritemoviesQuery] = useState<number>(1);

  const { data: configuration } = useGetConfigurationQuery();

  const {data, isFetching} = useGetFavoriteQuery(favoriteMoviesQuery);

  const movies = data?.results;

  const hasMorePages = data?.hasMorePages;
  function formatImageUrl(path?: string) {
    return path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined;
  }

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
        setFavoritemoviesQuery((page) => ( page + 1 ));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  return (
    <Container sx={{ py: 9 }}>
      <Grid container spacing={3}>
        {!isFetching && !movies?.length && <Typography variant="h6">No movies were found that match your query.</Typography>}
        {movies?.map((m) => (
          <Grid key={m.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
            <MovieCard
              id={m.id}
              title={m.title}
              overview={m.overview}
              popularity={m.popularity}
              enableUserActions={loggedIn}
              image={formatImageUrl(m.backdrop_path)}
            />
          </Grid>
        ))}
      </Grid>
      <div ref={targetRef}>{isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
    </Container>
  );
}

export default Favorites;
