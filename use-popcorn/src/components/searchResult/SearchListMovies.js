import SearchMovie from "./SearchMovie";

function SearchListMovies({ movies, onMovieSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <SearchMovie
          movie={movie}
          key={movie.imdbID}
          onMovieSelect={onMovieSelect}
        />
      ))}
    </ul>
  );
}

export default SearchListMovies;
