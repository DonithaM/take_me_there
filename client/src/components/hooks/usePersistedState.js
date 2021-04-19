import React, { useEffect, useState } from "react";

const usePersistedState = (initialVal, key) => {
  const [storedValue, setStoredValue] = useState(() => {
    const currentVal = localStorage.getItem(key);
    if (currentVal) {
      return JSON.parse(currentVal);
    } else {
      return initialVal;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default usePersistedState;
