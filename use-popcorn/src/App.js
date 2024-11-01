import List from "./List";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import MovieDetails from "./components/movie/MovieDetails";
import WatchedListMovies from "./components/watched/WatchedListMovies";
import WatchedListSummary from "./components/watched/WatchedListSummary";
import SearchListMovies from "./components/searchResult/SearchListMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movies, isLoading, error] = useMovies(query);
  const [watched, setWatched] = useLocalStorage("watchedMovies", []);

  const handleSelectMovie = (id) => {
    if (selectedId === id) handleCloseMovie();
    else setSelectedId(id);
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (newMovie) => {
    setWatched([...watched, newMovie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main movies={movies}>
        <List>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <SearchListMovies
              movies={movies}
              onMovieSelect={handleSelectMovie}
            />
          )}
        </List>

        <List>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              watched={watched}
              selectedId={selectedId}
              onMovieClose={handleCloseMovie}
              onMovieAdd={handleAddWatched}
            />
          ) : (
            <>
              <WatchedListSummary watched={watched} />
              <WatchedListMovies
                watched={watched}
                onMoiveDelete={handleDeleteWatched}
              />
            </>
          )}
        </List>
      </Main>
    </>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      // don't delete the query if search box is focussed
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        setQuery("");
        inputEl.current.focus();
      }
    };

    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);

  return (
    <input
      type="text"
      ref={inputEl}
      value={query}
      className="search"
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}
