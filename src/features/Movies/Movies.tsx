import { MovieCard } from "./MovieCard";
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Container, Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { MoviesFilter } from "./MoviesFilter";
import {
  MoviesFilters,
  MoviesQuery,
  useGetConfigurationQuery,
  useGetFavoriteQuery,
  useGetMoviesQuery,
  useSearchMoviesQuery,
} from "../../services/tmdb";

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

function Movies() {
  const [moviesQuery, setmoviesQuery] = useState<MoviesQuery>(initialQuery);
  const [favoritePage, setFavoritePage] = useState(1);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(moviesQuery);

  const [query, setQuery] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: searchMovie, isFetching: searchFetching } = useSearchMoviesQuery(searchTerm, {
    skip: !searchTerm.trim(),
  });

  const isSearching = searchTerm.trim() !== "";

  const movies = isSearching ? searchMovie?.results : data?.results;

  const hasMorePages = data?.hasMorePages;
  function formatImageUrl(path?: string) {
    return path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined;
  }

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;

  const { data: favoritesData, isFetching: favoritesFetching } = useGetFavoriteQuery(favoritePage, {
    skip: !loggedIn,
  });

  const favoriteIds = new Set(favoritesData?.results.map((movie) => movie.id) ?? []);

  const favoriteHasMorePages = favoritesData?.hasMorePages;

  useEffect(() => {
    if (loggedIn && !favoritesFetching && favoriteHasMorePages) {
      setFavoritePage((page) => page + 1);
    }
  }, [loggedIn, favoritesFetching, favoriteHasMorePages]);

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setmoviesQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid size="auto" sx={{ py: 9 }}>
        <MoviesFilter
          onApply={(f) => {
            const moviesFilters: MoviesFilters = {
              keywords: f.keywords.map((k) => k.id),
              companies: f.companies.map((c) => c.id),
              genres: f.genres,
            };
            setmoviesQuery({
              page: 1,
              filters: moviesFilters,
            });
          }}
        />
      </Grid>
      <Grid size={12}>
        <Container sx={{ py: 9 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 1,
            }}
          >
            <TextField value={query} onChange={(event) => setQuery(event.target.value)} label="Search movies" variant="outlined" />
            <Button
              variant="contained"
              onClick={() => {
                const value = query.trim();
                if (value) {
                  setSearchTerm(value);
                }
              }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setQuery("");
                setSearchTerm("");
                setmoviesQuery(initialQuery);
              }}
            >
              Now playing!
            </Button>
          </Box>
          {/* <Typography variant="h4" align="center">
                    {query ? `Search results: ${query}` : "Now playing"}
                </Typography> */}
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
                  isFavorite={favoriteIds.has(m.id)}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>{isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Movies;
