import '../css/Favorites.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Favorite() {

	const {favorites} = useMovieContext();

	if (favorites) {
		return (
			<>
			<h2>Your favorites</h2>
			<div className="movies-grid">
				{favorites.map((favorite) => (
					<MovieCard movie={favorite} key={favorite.key} />
				))}
			</div>
			</>
		)
	}

	return (
		<>
		<div className="favorites-empty">
			<h2>No Favorite Movie Yet</h2>
			<p>Start adding movie to your favorites and they will appear here</p>
		</div>
		</>
	)
}

export default Favorite;

