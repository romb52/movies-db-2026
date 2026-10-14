import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../configuration";
import { CompanyItem, KeywordItem } from "../features/Movies/MoviesFilter";

interface Configuration {
  images: {
    base_url: string;
  };
}

export interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
}

interface MoviesResponse {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}

interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
}

interface PageResponse<TResults> {
  page: number;
  results: TResults[];
  total_pages: number;
}

export interface MoviesFilters {
  keywords?: number[];
  companies?: number[];
  genres?: number[];
}

interface Genre {
  id: number;
  name: string;
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}/3`,
    prepareHeaders(headers) {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${configuration.apiToken}`);
    },
  }),
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => "/configuration",
    }),
    getNowPlaying: builder.query<PageResponse<MovieDetails>, number>({
      query: (page = 1) => `/movie/now_playing?page=${page}`,
    }),
    searchMovies: builder.query<PageResponse<MovieDetails>, string>({
      query: (query) => `/search/movie?query=${encodeURIComponent(query)}&page=1`,
    }),
    getMovies: builder.query<MoviesResponse, MoviesQuery>({
      query: ({ page, filters }) => {
        const params = new URLSearchParams({
          page: page.toString(),
        });

        if (filters.keywords?.length) {
          params.append("with_keywords", filters.keywords.join("|"));
        }

         if (filters.companies?.length) {
          params.append("with_companies", filters.companies.join("|"));
        }

        if (filters.genres?.length) {
          params.append("with_genres", filters.genres.join(","));
        }

        const query = params.toString();

        const path = `/discover/movie?${query}`;
        return path;
      },
      transformResponse: (response: PageResponse<MovieDetails>, _, arg) => {
        return {
          results: response.results,
          lastPage: response.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCachData, responseData) {
        if (responseData.lastPage === 1) {
          currentCachData.results = responseData.results;
        } else {
          currentCachData.results.push(...responseData.results);
        }
        currentCachData.lastPage = responseData.lastPage;
        currentCachData.hasMorePages = responseData.hasMorePages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (query) => `/search/keyword?query=${query}`,     
      transformResponse: (response: PageResponse<KeywordItem>) => response.results,
    }),
     getCompany: builder.query<CompanyItem[], string>({
      query: (query) => `/search/company?query=${query}`,
      transformResponse: (response: PageResponse<CompanyItem>) => response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => "/genre/movie/list",
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
    getMovieDetails: builder.query<MovieDetails, number>({
      query: (id) => `/movie/${id}`,
    }),
  }),
});

export const {
  useGetConfigurationQuery,
  useGetGenresQuery,
  useGetKeywordsQuery,
  useGetMoviesQuery,
  useGetNowPlayingQuery,
  useGetMovieDetailsQuery,
  useSearchMoviesQuery,
  useGetCompanyQuery,
} = tmdbApi;
