import { useCallback } from 'react';
import { debounce } from '../assets/utils/helpers';

export const useDebounced = (
	func: (...args: any[]) => any,
	delay = 1000,
	deps: any[] = []
) => {
	return useCallback(debounce(func, delay), deps);
};
