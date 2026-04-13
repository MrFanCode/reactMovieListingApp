
// Create the .env file and create a variable with the api key like VITE_API_KEY=apikey
// The variable name should be start VITE_* if you are using vite in this project it does use vite
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3"


export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};


export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(query)}`);
    const data = await response.json()
    return data.results
};


