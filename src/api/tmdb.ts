import configuration from "../configuration";

async function get(relativeURL: string) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`
        }
    };

    const response = await fetch(`${configuration.apiUrl}/3${relativeURL}`, options)
    const json = await response.json()

    return json;



}

export const client = {
    async getNowPlaying() {
        return await get('/movie/now_playing?page=1');
    }
}