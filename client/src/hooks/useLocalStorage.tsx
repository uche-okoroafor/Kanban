import { useState } from 'react';
import { User } from '../interface/User';

type StorageState = string | typeof Function | User | null | undefined;
interface UseLocalStorageParam {
  key: string;
  initialValue: StorageState;
}

type UseLocalStorage = [state: StorageState, setLocalStorage: (newState: StorageState) => void];

export const useLocalStorage = ({ key, initialValue }: UseLocalStorageParam): UseLocalStorage => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalStorage = (newState: StorageState) => {
    try {
      const newValue = typeof newState === 'function' ? newState(state) : newState;
      setState(newValue);
    } catch (error) {
      console.error(`Error storing new value for ${key} in localStorage.`);
    }
  };

  return [state, setLocalStorage];
};
