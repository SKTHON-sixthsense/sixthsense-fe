import { useState, useEffect } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const value = localStorage.getItem(key);
    setValue(value);
  }, [key]);

  return { value, setValue };
};

export default useLocalStorage;
