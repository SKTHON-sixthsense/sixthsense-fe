import { useState, useEffect, useCallback } from "react";

const useLocalStorage = <T = string>(
  key: string,
  initialValue?: T
): [T | null, (newValue: T) => void] => {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        // Try to parse if it's JSON
        setValue(JSON.parse(storedValue) as T);
      } catch {
        // If parsing fails, use as string
        setValue(storedValue as T);
      }
    } else if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [key]); // Remove initialValue from deps to avoid re-running

  const updateValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      if (typeof newValue === "string") {
        localStorage.setItem(key, newValue);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    [key]
  );

  return [value, updateValue];
};

export default useLocalStorage;
