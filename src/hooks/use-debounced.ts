import { useCallback } from 'react';
import { debounce } from '../assets/utils/helpers';

export const DEFAULT_DELAY = 1000;

export const useDebounced = (
  func: (...args: any[]) => any,
  delay = DEFAULT_DELAY,
  deps: any[] = []
) => {
  return useCallback(debounce(func, delay), deps);
};
