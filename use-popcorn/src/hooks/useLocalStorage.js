import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
