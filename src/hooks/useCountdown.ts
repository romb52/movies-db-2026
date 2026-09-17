import { useState, useRef, useEffect } from "react";

export default function useCountdown(max: number) {
    const [countdown, setCountdown] = useState(max);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!running) { return; }

        intervalRef.current = setInterval(() => {
            setCountdown(value => {
                if (value <= 1) {
                    setRunning(false);
                    return 0;
                }
                return value - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        }
    }, [running]);

   function start (){
    setCountdown(max);
    setRunning(true);
   }

   function pause(){
    setRunning(false);
   }

    return {
        countdown,
        start,
        pause
    };

}