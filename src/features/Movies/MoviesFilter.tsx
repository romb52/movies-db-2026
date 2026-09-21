import { FilterAltOutlined } from "@mui/icons-material";
import { Autocomplete, Button, FormControl, Paper, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { client } from "../../api/tmdb";



const keywordOptions: KeywordItems[] = [
    { id: 1, name: "brave" },
    { id: 2, name: "love" },
    { id: 3, name: "action" }
];

const selected: KeywordItems[] = [
    { id: 2, name: "love" },
    { id: 3, name: "action" }
];

interface KeywordItems {
    id: number;
    name: string;
};

interface Filters {
    keywords: KeywordItems[],
};

export function MoviesFilter() {
    const { handleSubmit, control, } = useForm<Filters>({
        defaultValues: {
            keywords: []
        }
    }
    );

    const fetchKeywords = (value: string) => {
setKeywordsLoading(true); 
const options= await client.getKeywords();
    };

    return <Paper sx={{ m: 2, p: 0.5 }}>
        <form>
            <FormControl
                component={"fieldset"}
                variant="standard"
                sx={{ m: 2, display: "block" }}
            >
                <Controller
                    name="keywords"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            multiple
                            disablePortal
                            loading={false}
                            options={keywordOptions}
                            filterOptions={x => x}
                            getOptionLabel={option => option.name}
                            onChange={(_, value) => onChange(value)}
                            value={value}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={params => <TextField {...params} label="Keywords" />}
                            onInputChange={(_, value) => fetchKeywords(value)}
                        />
                    )} />

            </FormControl>
            <Button type="submit" variant="contained" sx={{m: 2}} startIcon={<FilterAltOutlined/>}>
                Apply filter 
            </Button>
        </form>
    </Paper>

}