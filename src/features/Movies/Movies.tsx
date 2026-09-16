import { fetchMovies, Movie, searchMovies } from "../../reducers/movies";
import { connect } from "react-redux"
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { Box, Button, Container, Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";


interface MoviesProps {
    movies: Movie[];
    loading: boolean
}

function Movies({ movies, loading }: MoviesProps) {
    const dispatch = useAppDispatch();

    const auth = useContext(AuthContext);
    const loggedIn = auth.user !== anonymousUser;

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const [query, setQuery] = useState("");

    return (
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
                        dispatch(fetchMovies());
                    }
                    }
                >
                    Now playing
                </Button>
            </Box>
            <Typography variant="h4" align="center">
                {query ? `Search results: ${query}` : "Now playing"}
            </Typography>

            {
                loading ? (<LinearProgress color="secondary" />) :
                    (
                        <Grid container spacing={3}>
                            {movies.map((m) => (
                                <Grid key={m.id}
                                    size={{ xs: 12, sm: 6, md: 4 }}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <MovieCard id={m.id} title={m.title} overview={m.overview} popularity={m.popularity} enableUserActions={loggedIn} image={m.image} />
                                </Grid>
                            ))}
                        </Grid>
                    )
            }

        </Container >
    );
}


const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading
})
const connector = connect(mapStateToProps);
export default connector(Movies);