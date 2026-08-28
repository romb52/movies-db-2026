import type { Action, Reducer } from "redux";


interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
}

interface MovieState {
    top: Movie[]
}

const initialState: MovieState = {
    top: [
        { id: 1, title: "Interstellar", popularity: 99, overview: "A science fiction movie...." },
        { id: 2, title: "fgf", popularity: 90, overview: "klgjk...." },
        { id: 3, title: "fjnsfdgsdfgdfgddfgnj", popularity: 9, overview: "gjilfghzsdf...." },
        { id: 4, title: "kfjhkdtghd", popularity: 55, overview: "tsjfgghasdf...." }
    ]
}

const moviesReducer: Reducer<MovieState, Action> = (state = initialState, action) => {
    return state;
}

export default moviesReducer;