import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";


export default function CountdownText() {
    const [countdown, setCountdown] = useState(9);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCountdown(value => value - 1);
        }, 1000);

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }
    }, [countdown])

    return (
        <Typography variant="h5" align="center">
            Coming soon: {countdown}
        </Typography>
    )

}