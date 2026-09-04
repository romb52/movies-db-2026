import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import styles from "./MovieDetails.module.scss";


export function MovieDetails() {
    const { id } = useParams();
    const movies = useSelector((state: RootState) => state.movies.top);
    const movie = movies.find((movie) => movie.id === Number(id));

    if (!movie) {
        return <h1>Movie not found</h1>;
    }

    return (
        <section className={styles.details}>
            <div className={styles.poster}>
                <img src="/thumbnail.jpg" alt={movie.title} />
            </div>
            <div className={styles.info}>
                <h1>{movie.title}</h1>
                <div className={styles.popularity}>Popularity: {movie.popularity}</div>
                <div className={styles.overview}>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </section>
    );

}