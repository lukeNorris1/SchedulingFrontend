// useLocalStorage.ts
import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; // If the item doesn't exist, return the initialValue
    } catch (error) {
      console.error("Error parsing local storage value:", error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting local storage value:", error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
