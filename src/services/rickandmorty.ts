import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

export interface EpisodesResponse {
  episodes: {
    results: Episode[];
  };
}

export interface EpisodesQuery {
  page: number;
}

export interface EpisodesState {
  results: Episode[];
}

export interface Episode {
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
}

export interface Character {
  id: number;
  name: string;
  image: string;
}

export interface CharacterDetails extends Character {
  status: string;
  species: string;
  gender: string;
}

const CHARACTERS_FRAGMENT = gql`
  fragment CharacterFields on Character {
    id
    name
    image
    status
    species
    gender
  }
`;

export const rickandmortyApi = createApi({
  reducerPath: "rickandmortyApi",
  baseQuery: graphqlRequestBaseQuery({
    url: "https://rickandmortyapi.com/graphql",
  }),
  endpoints: (builder) => ({
    getEpisodes: builder.query<EpisodesState, EpisodesQuery>({
      query({ page }) {
        return {
          document: gql`
            query GetEpisodesPage($page: Int!) {
              episodes(page: $page) {
                results {
                  name
                  air_date
                  episode
                  characters {
                    id
                    name
                    image
                  }
                }
              }
            }
          `,
          variables: {
            page,
          },
        };
      },
      transformResponse(response: EpisodesResponse) {
        return { results: response.episodes.results };
      },
    }),
    getCharacter: builder.query<CharacterDetails | null, number>({
      query: (id) => ({
        document: gql`
          ${CHARACTERS_FRAGMENT}

          query GetCharacter($id: ID!) {
            character(id: $id) {
              ...CharacterFields
            }
          }
        `,
        variables: { id },
      }),
      transformResponse(response: { character: CharacterDetails | null }) {
        return response.character;
      },
    }),
  }),
});

export const { useGetEpisodesQuery, useGetCharacterQuery } = rickandmortyApi;
