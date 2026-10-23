import { Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, LinearProgress } from "@mui/material";
import { Pager } from "./Pager";
import { EpisodeCard } from "./EpisodeCard";
import { EpisodesQuery, useGetEpisodesQuery } from "../../services/rickandmorty";
import { useState } from "react";
import { CharacterDetails, CharacterDetailsProps } from "./CharacterDetails";
import CloseIcon from "@mui/icons-material/Close";

const defaultQuery = { page: 1 };
//const defaultCharacterId = { id: 3 };

export function Extra() {
  const [idQuery, setIdQuery] = useState<number | null>(null);
  const [query, setQuery] = useState<EpisodesQuery>(defaultQuery);
  const { data, isFetching } = useGetEpisodesQuery(query);

  return (
    <Container sx={{ py: 9 }} maxWidth="xl">
      <Pager
        current={query.page}
        onNext={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
        onPrev={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
      />
      <Dialog open={idQuery !== null} onClose={() => setIdQuery(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          Character details
          <IconButton aria-label="close" onClick={() => setIdQuery(null)} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>{idQuery !== null && <CharacterDetails id={idQuery} />}</DialogContent>
      </Dialog>
      {isFetching && <LinearProgress sx={{ mb: 2 }} />}
      <Grid container spacing={2}>
        {data?.results.map((e) => (
          <Grid key={e.episode} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
            <EpisodeCard
              name={e.name}
              episode={e.episode}
              air_date={e.air_date}
              characters={e.characters}
              onSelectedCharacter={setIdQuery}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
