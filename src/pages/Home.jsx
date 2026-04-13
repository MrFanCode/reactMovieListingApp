import MovieCard from "../components/MovieCard";
import {useState, useEffect} from 'react';
import { getPopularMovies, searchMovies } from "../services/api";
import '../css/Home.css'

function Home() {

	const [searchQuery, setSearchQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [error , setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadPopularMovies = async () => {
			try {
				const popularMovies = await getPopularMovies();
				setMovies(popularMovies);
			} catch (err) {
				console.log(err)
				setError("Failed to load movies...")
			} finally {
				setLoading(false) // not loading anything
			}
		}
		loadPopularMovies();
	}, []); // if nothing change in dependencies array then it runs the function once when render this component

	// const movies = [
	// 	{id: 1, title: "John Wick", release_date: 2020},
	// 	{id: 2, title: "Terminator", release_date: 1987},
	// 	{id: 3, title: "Matrix", release_date: 1998},
	// ]

	const handleSearch = async (e) => {
		e.preventDefault()

		if (!searchQuery.trim()) return // dont accept empty value
		if (loading) return // while loading cannot search

		setLoading(true)
		try {
			const searchResults = await searchMovies(searchQuery)
			setMovies(searchResults)
			setError(null)
		} catch (err) {
			console.log(err)
			setError("Failed to search movies...")
		} finally {
			setLoading(false);
		}

		setSearchQuery("")
	}
	

	return (
		<>
		<div className="home">

			<form onSubmit={handleSearch} className="search-form">
				<input 
					type="text"
					placeholder="Search for movie..."
					className="search-input"
					value={searchQuery} // get what been typed and show
					onChange={(e) => setSearchQuery(e.target.value)} // update when typed
				/>	
				<button type="submit" className="search-button" >Search</button>
			</form>

			{error && <div className="error-message">{error}</div>}

			{ loading ? (
				<div className="loading">Loading...</div>
				) : (
				<div className="movies-grid">
				{movies.map((movie) => (
					<MovieCard movie={movie} key={movie.id} />
				))}
			</div>)}
		</div>
		</>
	);

}

export default Home;
