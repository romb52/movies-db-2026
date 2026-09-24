import { fetchFirstPage, fetchNextPage, resetMovies, searchMovies } from "../../reducers/movies";
import { MovieCard } from "./MovieCard";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Box, Button, Container, Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Filters, MoviesFilter } from "./MoviesFilter";



function Movies() {
    const [filters, setFilters] = useState<Filters>();
    const [query, setQuery] = useState("");
    const dispatch = useAppDispatch();

    const movies = useAppSelector((state) => state.movies.top);
    const loading = useAppSelector((state) => state.movies.loading);
    const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;

    const [targetRef, entry] = useIntersectionObserver();

    useEffect(() => {
        dispatch(resetMovies())
    }, [dispatch]);

    useEffect(() => {
        if (entry?.isIntersecting && hasMorePages && !query) {
            const moviesFilters = filters ? {
                keywords: filters.keywords.map(k => k.id),
                genres: filters.genres
            } : undefined;
            dispatch(fetchNextPage(moviesFilters));
        }
    }, [dispatch, entry?.isIntersecting, hasMorePages, query, filters]);




    return (
        <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
            <Grid size="auto" sx={{ py: 9 }}>
                <MoviesFilter onApply={(f) => {
                    dispatch(resetMovies())
                    setFilters(f)
                }} />
            </Grid>
            <Grid size={12}>
                <Container sx={{ py: 9 }} >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 1
                        }}
                    >
                        <TextField
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            label="Search movies"
                            variant="outlined"
                        />
                        <Button variant="contained"
                            onClick={() => {
                                const value = query.trim();
                                if (value) {
                                    dispatch(searchMovies(value));
                                }
                            }}>
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setQuery("");
                                dispatch(fetchFirstPage());
                            }
                            }
                        >
                            Now playing!
                        </Button>
                    </Box>
                    {/* <Typography variant="h4" align="center">
                    {query ? `Search results: ${query}` : "Now playing"}
                </Typography> */}
                    <Grid container spacing={3}>
                        {!loading && !movies.length && <Typography variant="h6">No movies were found that match your query.</Typography>}
                        {movies.map((m) => (
                            <Grid key={m.id}
                                size={{ xs: 12, sm: 6, md: 4 }}
                                sx={{ display: "flex", justifyContent: "center" }}
                            >
                                <MovieCard id={m.id} title={m.title} overview={m.overview} popularity={m.popularity} enableUserActions={loggedIn} image={m.image} />
                            </Grid>
                        ))}
                    </Grid>
                    <div ref={targetRef}>{loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}</div>
                </Container >
            </Grid>
        </Grid>
    );
}


export default Movies;