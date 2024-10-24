import { useCallback, useEffect, useRef, useState } from "react";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import SearchListMovies from "./components/searchResult/SearchListMovies";
import WatchedListSummary from "./components/watched/WatchedListSummary";
import WatchedListMovies from "./components/watched/WatchedListMovies";
import List from "./List";
import MovieDetails from "./components/movie/MovieDetails";

const KEY = "68da0a77";

// Debounce polyfill function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const data = localStorage.getItem("watchedMovies");
    if (data) return JSON.parse(data);
    else return [];
  });
  const [selectedId, setSelectedId] = useState(null);

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

  const fetchMovies = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      setIsLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${searchQuery}`)
        .then((res) => {
          if (!res.ok)
            throw new Error("Something went wrong while fetching movies.");
          return res.json();
        })
        .then((data) => {
          if (data.Response === "False") throw new Error("No movies Found");
          setError("");
          setMovies(data.Search);
        })
        .catch((err) => {
          setError(err.message);
          setMovies([]);
        })
        .finally(() => setIsLoading(false));
    }, 1000),
    []
  );

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    handleCloseMovie();
    fetchMovies(query);
  }, [query, fetchMovies]);

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
