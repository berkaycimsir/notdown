import { useState, useEffect, useCallback } from 'react';
import browserStorage from 'store';

type ReturnType<T> = [T, (newState: T) => void];

const usePersistState = <T>(
  storageKey: string,
  initialState: T
): ReturnType<T> => {
  const [state, setInternalState] = useState<T>(initialState);

  useEffect(() => {
    const storageInBrowser = browserStorage.get(storageKey);

    if (storageInBrowser) {
      setInternalState(storageInBrowser);
    }
  }, [storageKey]);

  const setState = useCallback(
    (newState: T) => {
      browserStorage.set(storageKey, newState);
      setInternalState(newState);
    },
    [storageKey]
  );

  return [state, setState];
};

export default usePersistState;
