import configuration from "../configuration";

async function get<TBody>(relativeURL: string): Promise<TBody> {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`
        }
    };

    const response = await fetch(`${configuration.apiUrl}/3${relativeURL}`, options)
    const json: TBody = await response.json()

    return json;
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
}

interface Configuration {
    images: {
        base_url: string;
    }
}

export const client = {
    async getConfiguration() {
        return get<Configuration>("/configuration");
    },

    async getNowPlaying(): Promise<MovieDetails[]> {
        const response = await get<PageResponse<MovieDetails>>('/movie/now_playing?page=1');
        return response.results;
    },
    async searchMovies(query: string): Promise<MovieDetails[]> {
        const response = await get<PageResponse<MovieDetails>>(`/search/movie?query=${encodeURIComponent(query)}&page=1`);
        return response.results;
    }

}