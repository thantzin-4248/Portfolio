
import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue === null) {
        return initialValue;
      }

      return JSON.parse(savedValue);
    } catch (error) {
      console.error("Failed to read localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
