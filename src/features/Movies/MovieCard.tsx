import { Link } from "react-router-dom";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    image?: string;
}


export function MovieCard({ id, title, overview, popularity, image= "/thumbnail.jpg" }: MovieCardProps) {
    return (
        <div className={styles.card}>
            <img className={styles.thumbnail} src={image} alt="thumbnail" />
            <div className={styles.content}>
                <Link to={`/movies/${id}`}>{title}</Link>
                <div className={styles.overview}>{overview}</div>
                <div className={styles.pop}>{popularity}</div>
            </div>
        </div>
    )
}