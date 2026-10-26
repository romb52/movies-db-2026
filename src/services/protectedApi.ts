import configuration from "../configuration";


export const protectedApi = {
    async getMessages(accessToken: string | undefined) {
        const response = await fetch(`${configuration.protectedApiUrl}/api/messages/protected`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                `API error ${response.status}: ${JSON.stringify(data)}`
            );
        }

        return data;
    }
};