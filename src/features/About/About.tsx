import { Container  } from "@mui/material";
import CountdownText from "./CountdownText";
import { CountDownVideo } from "./CountDownVideo";
import MapView from "./MapView";



export function About (){
    return <Container sx={{py: 9}}>
        <CountdownText/>     
        <CountDownVideo/> 
        <MapView/>       
    </Container>
}