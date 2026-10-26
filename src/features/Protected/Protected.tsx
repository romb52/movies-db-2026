import { useAuth0 } from "@auth0/auth0-react";
import { protectedApi } from "../../services/protectedApi";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, Box, Container, LinearProgress, Typography } from "@mui/material";


export function Protected() {

    const { getAccessTokenSilently } = useAuth0();
    const [response, setResponse] = useState("");

    useEffect(() => {
        const getMessages = async () => {
            const accessToken = await getAccessTokenSilently();
           // console.log("Access token exists:", Boolean(accessToken));
           // console.log("Token preview:", accessToken?.slice(0, 20));
            const messages = await protectedApi.getMessages(accessToken);
          //  console.log("API result:", messages);
            setResponse(JSON.stringify(messages, null, 2));
        }
        getMessages();
    }, [getAccessTokenSilently]);

    return <Container>
        <Alert severity="info" sx={{ mt: 10 }}>
            <AlertTitle>Info</AlertTitle>
            This page calls exterlal API protected by JWT token.
        </Alert>
        {!response && <LinearProgress />}
        <Box sx={{ mt: 2 }}>
            <Typography variant="button">Response:</Typography>
            <pre>
                <code>{response}</code>
            </pre>
        </Box>
    </Container>
}