import { useCallback, useEffect, useState } from "react";

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

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    // handleCloseMovie()
    fetchMovies(query);
  }, [query, fetchMovies]);

  return [movies, isLoading, error];
}
