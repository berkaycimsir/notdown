import { useEffect, useMemo, useRef, useState } from 'react';

import { debounce, DebounceSettings } from 'lodash';
import useShallowMemo from './useShallowMemo';

type FunctionType = Function;

function useDebounce<T extends FunctionType>(
  cb: T,
  time: number,
  options?: DebounceSettings
): T {
  const callbackRef = useRef(cb);
  callbackRef.current = cb;

  const memoizedOptions = useShallowMemo(options);

  const debouncedFn = useMemo(
    () =>
      debounce(
        (...args: any[]) => {
          callbackRef.current(...args);
        },
        time,
        memoizedOptions
      ),
    [time, memoizedOptions]
  );

  return debouncedFn as any;
}

export function useDebouncedValue<T>(value: T, time: number): T {
  const [val, setVal] = useState(value);
  const setter = useDebounce(setVal, time);
  useEffect(() => setter(value), [setter, value]);

  return val;
}

export default useDebounce;
