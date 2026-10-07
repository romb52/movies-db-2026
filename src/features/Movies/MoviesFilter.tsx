import { FilterAltOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Checkbox,
  debounce,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Skeleton,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
//import { client } from "../../api/tmdb";
import { useMemo, useState } from "react";
//import { useAppSelector } from "../../hooks";
import { useGetGenresQuery, useGetKeywordsQuery } from "../../services/tmdb";

export interface KeywordItem {
  id: number;
  name: string;
}

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}

export function MoviesFilter({ onApply }: MoviesFilterProps) {
  const [keywordsQuery, setKeywordsQuery] = useState<string>("");
  const { data: keywordsOptions = [], isLoading: keywordsLoading } = useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery });
  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();
  //const [keywordsLoading, setKeywordsLoading] = useState(false);
  //const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);
  //const genres = useAppSelector((state) => state.movies.genres);
  const { handleSubmit, control, formState } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const fetchKeywords = useMemo(
    () =>
      debounce((query: string) => {
        setKeywordsQuery(query);
      }, 1000),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl component={"fieldset"} variant="standard" sx={{ m: 2, display: "block" }}>
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                disablePortal
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onChange(value)}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Keywords" />}
                onInputChange={(_, value) => fetchKeywords(value)}
              />
            )}
          />
        </FormControl>
        <FormControl component={"fieldset"} variant="standard" sx={{ m: 2, display: "block" }}>
          {genresLoading ? (
            <Skeleton width={300} height={460} />
          ) : (
            <>
              {" "}
              <FormLabel component="legend">Genres</FormLabel>
              <FormGroup sx={{ maxHeight: 500 }}>
                <Controller
                  name="genres"
                  control={control}
                  render={({ field }) => (
                    <>
                      {genres.map((genre) => (
                        <FormControlLabel
                          key={genre.id}
                          control={
                            <Checkbox
                              value={genre.id}
                              checked={field.value.includes(genre.id)}
                              onChange={(event, checked) => {
                                const valueNumber = Number(event.target.value);
                                if (checked) {
                                  field.onChange([...field.value, valueNumber]);
                                } else {
                                  field.onChange(field.value.filter((value) => value !== valueNumber));
                                }
                              }}
                            />
                          }
                          label={genre.name}
                        />
                      ))}
                    </>
                  )}
                />
              </FormGroup>
            </>
          )}
        </FormControl>
        <Button type="submit" variant="contained" sx={{ m: 2 }} startIcon={<FilterAltOutlined />} disabled={!formState.isDirty}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
}
