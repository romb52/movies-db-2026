import { Card, CardActions, CardMedia, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRef, useState } from "react";

export function CountDownVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    function toogglePlaying() {
        const nexPlaying = !isPlaying;
        if (nexPlaying) {
            if (videoRef.current !== null) { videoRef.current.play(); }
        } else {
            if (videoRef.current !== null) { videoRef.current.pause(); }
        }
    }

    return (
        <Card>
            <CardMedia>
                <video ref={videoRef} src="https://www.pexels.com/ru-ru/download/video/7033607/"
                    height="500" 
                    onPlay={()=> setIsPlaying(true)}
                    onPause={()=> setIsPlaying(false)}/>
            </CardMedia>
            <CardActions>
                <IconButton onClick={toogglePlaying}>
                   {isPlaying? <PauseIcon sx={{ height: 38, width: 38 }}/> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
                </IconButton>
            </CardActions>
        </Card>
    )
}