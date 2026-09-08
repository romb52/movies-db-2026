import { fetchMovies, Movie } from "../../reducers/movies";
import { connect } from "react-redux"
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import styles from "./Movies.module.scss";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";

interface MoviesProps {
    movies: Movie[];
    loading: boolean
}


function Movies({ movies, loading }: MoviesProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMovies());           
    }, [dispatch])


    return <section>
        <div className={styles.list}>
            {loading ? (<h2>Loading...</h2>) :

            (movies.map((m) => (
                <li key={m.id}>
                    <MovieCard key={m.id} id={m.id} title={m.title} overview={m.overview} popularity={m.popularity} image={m.image} />
                </li>
            )))}
        </div>
    </section>
}


const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading
})
const connector = connect(mapStateToProps);
export default connector(Movies);