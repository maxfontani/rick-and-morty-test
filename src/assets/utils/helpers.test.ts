import { debounce } from './helpers';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should debounce a function', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    // Call the debounced function multiple times in a short interval
    debouncedFn(1);
    debouncedFn(2);
    debouncedFn(3);

    // Advance the timers by 50ms (less than the debounce time)
    jest.advanceTimersByTime(50);

    // The debounced function should not have been called yet
    expect(fn).not.toHaveBeenCalled();

    // Advance the timers by another 100ms (equal to or greater than debounce time)
    jest.advanceTimersByTime(100);

    // Now, the debounced function should have been called with the last argument (3)
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it('should reset the debounce timer when called again within the debounce time', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    // Call the debounced function once
    debouncedFn(1);

    // Advance the timers by 50ms (less than the debounce time)
    jest.advanceTimersByTime(50);

    // Call the debounced function again within the debounce time
    debouncedFn(2);

    // Advance the timers by another 100ms (equal to or greater than debounce time)
    jest.advanceTimersByTime(100);

    // The debounced function should have been called with the latest argument (2)
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
  });
});