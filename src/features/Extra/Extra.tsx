import { Container, Grid, LinearProgress } from "@mui/material";
import { Pager } from "./Pager";
import { EpisodeCard } from "./EpisodeCard";
import { EpisodesQuery, useGetEpisodesQuery } from "../../services/rickandmorty";
import { useState } from "react";
import { CharacterDetails } from "./CharacterDetails";

const defaultQuery = { page: 1 };

export function Extra() {
  const [query, setQuery] = useState<EpisodesQuery>(defaultQuery);
  const { data, isFetching } = useGetEpisodesQuery(query);

  return (
    <Container sx={{ py: 9 }} maxWidth="xl">
      <Pager
        current={query.page}
        onNext={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
        onPrev={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
      />
      <CharacterDetails id={2} />
      {isFetching && <LinearProgress sx={{ mb: 2 }} />}
      <Grid container spacing={2}>
        {data?.results.map((e) => (
          <Grid key={e.episode} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
            <EpisodeCard name={e.name} episode={e.episode} air_date={e.air_date} characters={e.characters} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
