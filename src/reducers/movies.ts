import type { Action, Reducer } from "redux";


export interface Movie {
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
  {
    id: 1,
    title: "Interstellar",
    popularity: 99,
    overview: "A team of explorers travels through a wormhole in space in search of a new home for humanity."
  },
  {
    id: 2,
    title: "Inception",
    popularity: 95,
    overview: "A skilled thief who steals secrets through dreams is given a chance to erase his past by planting an idea in someone's mind."
  },
  {
    id: 3,
    title: "The Dark Knight",
    popularity: 94,
    overview: "Batman faces a criminal mastermind who spreads chaos across Gotham City and pushes its heroes to their limits."
  },
  {
    id: 4,
    title: "The Matrix",
    popularity: 91,
    overview: "A computer hacker discovers that the world he knows is a simulated reality and joins a rebellion against its creators."
  }
]
}

const moviesReducer: Reducer<MovieState, Action> = (state = initialState, action) => {
    return state;
}

export default moviesReducer;