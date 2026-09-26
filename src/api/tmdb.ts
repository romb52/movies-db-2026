//import { genres } from './../features/Movies/genres';
//import { Movie } from './../reducers/movies';
import configuration from "../configuration";
import axios from "axios";
import { KeywordItem } from "../features/Movies/MoviesFilter";
import { Genre } from "../reducers/movies";

async function get<TBody>(relativeURL: string): Promise<TBody> {

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: `Bearer ${configuration.apiToken}`
    //     }
    // };

    // const response = await fetch(`${configuration.apiUrl}/3${relativeURL}`, options)
    // const json: TBody = await response.json()

    // return json;

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`
        }
    }

    const response = await axios.get<TBody>(`${configuration.apiUrl}/3${relativeURL}`, options);

    return response.data;
}

export interface MovieDetails {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    backdrop_path?: string;
    poster_path?: string
}

interface PageResponse<TResults> {
    page: number;
    results: TResults[];
    total_pages: number;
}


interface PageDetails<TResults> {
    page: number;
    results: TResults[];
    totalPages: number;
}

interface Configuration {
    images: {
        base_url: string;
    }
}

export interface MoviesFilters {
keywords?: number[];
genres?: number[]
}

interface GenreResponse{
    genres: Genre[];
}

export const client = {
    async getConfiguration() {
        return get<Configuration>("/configuration");
    },

    async getNowPlaying(page: number = 1): Promise<PageDetails<MovieDetails>> {
        const response = await get<PageResponse<MovieDetails>>(`/movie/now_playing?page=${page}`);
        return {
            results: response.results,
            page: response.page,
            totalPages: response.total_pages
        }
    },
    async searchMovies(query: string): Promise<MovieDetails[]> {
        const response = await get<PageResponse<MovieDetails>>(`/search/movie?query=${encodeURIComponent(query)}&page=1`);
        return response.results;
    },
    async getMovies(page: number, filters: MoviesFilters  ) {
        const params = new URLSearchParams ({
            page: page.toString()
        }); 

        if (filters.keywords?.length){
           params.append("with_keywords", filters.keywords.join("|")) 
        }

        
        if (filters.genres?.length){
           params.append("with_genres", filters.genres.join(",")) 
        }

        const query = params.toString();

        const response = await get<PageResponse<MovieDetails>>(`/discover/movie?${query}`);
        return {
            results: response.results,
            page: response.page,
            totalPages: response.total_pages
        }
    },
    async getKeywords(query: string) {
        const response = await get<PageResponse<KeywordItem>>(`/search/keyword?query=${query}`);
        return response.results;
    },
    async getGenreList (){
         const response = await get<GenreResponse>("/genre/movie/list");
        return response.genres;
    } 

}