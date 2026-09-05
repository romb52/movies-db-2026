async function get(relativeURL: string) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
        }
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/3${relativeURL}`, options)
    const json = await response.json()

    return json;



}

export const client = {
    async getNowPlaying() {
        return await get('/movie/now_playing?page=1');
    }
}