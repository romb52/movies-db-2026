import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useCountdown from "../../hooks/useCountdown";


export default function CountdownText() {
    const { countdown, start, pause } = useCountdown(20);

    return (
        <Stack spacing={2} sx={{mb:2, alignItems: "center"}}>
            <Typography variant="h5" align="center">
                Coming soon: {countdown}
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={start}>
                    Start
                </Button>
                <Button variant="outlined" onClick={pause}>
                    Pause
                </Button>
            </Stack>
        </Stack>
    )

}