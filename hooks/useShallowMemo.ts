import { useRef } from 'react';

const isObject = (obj: any) => typeof obj === 'object' && obj !== null;

const shallowCompare = (obj1: any, obj2: any, deep: boolean): boolean => {
  if (Object.is(obj1, obj2)) {
    return true;
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return Object.keys(obj1).every((key) => {
    const hasKey = key in obj2;
    const isSame = Object.is(obj1[key], obj2[key]);

    if (!hasKey) {
      return false;
    }

    if (isSame) {
      return true;
    }

    if (deep) {
      return shallowCompare(obj1[key], obj2[key], true);
    }

    return false;
  });
};

function useShallowMemo<T>(obj: T, deep = false): T {
  const ref = useRef(obj);

  if (!shallowCompare(ref.current, obj, deep)) {
    ref.current = obj;
  }

  return ref.current;
}

export default useShallowMemo;
