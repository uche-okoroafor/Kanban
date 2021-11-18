import { useState } from 'react';

interface UseLocalStorageParam {
  key: string;
  initialValue: string | Record<string, unknown> | null;
}

export const useLocalStorage = ({ key, initialValue }: UseLocalStorageParam): any[] => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalStorage = (newState: any) => {
    try {
      const newValue = typeof newState === 'function' ? newState(state) : newState;
      setState(newValue);
    } catch (error) {
      console.error(`Error storing new value for ${key} in localStorage.`);
    }
  };

  return [state, setLocalStorage];
};
