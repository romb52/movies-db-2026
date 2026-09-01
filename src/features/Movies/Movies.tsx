import { Movie } from "../../reducers/movies";
import { connect } from "react-redux"
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import styles from "./Movies.module.scss";

interface MoviesProps {
    movies: Movie[]
}


function Movies({ movies }: MoviesProps) {
    return <section>
        <div className={styles.list}>
            {movies.map((m) => (
                <li key={m.id}>
                    <MovieCard key={m.id} id={m.id} title={m.title} overview={m.overview} popularity={m.popularity} />
                </li>
            ))}
        </div>
    </section>
}


const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
})
const connector = connect(mapStateToProps);
export default connector(Movies);