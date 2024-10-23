import WatchedMovie from "./WatchedMovie";

function WatchedListMovies({ watched, onMoiveDelete }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onMoiveDelete={onMoiveDelete}
        />
      ))}
    </ul>
  );
}

export default WatchedListMovies;
