type F = (...args: any[]) => any;

export function debounce(fn: F, ms: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function debouncedFn(...args: Parameters<F>) {
    const fnCall = () => {
      fn.apply(null, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

export const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== 'string' || !str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
};
