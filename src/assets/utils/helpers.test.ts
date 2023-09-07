import { capitalizeFirstLetter, debounce } from './helpers';

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

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter', () => {
    // Test cases
    const input1 = 'hello';
    const input2 = 'world';
    const input3 = 'example string';
    const input4 = 'capitalized';

    // Expected results
    const expected1 = 'Hello';
    const expected2 = 'World';
    const expected3 = 'Example string';
    const expected4 = 'Capitalized';

    // Test each input
    expect(capitalizeFirstLetter(input1)).toEqual(expected1);
    expect(capitalizeFirstLetter(input2)).toEqual(expected2);
    expect(capitalizeFirstLetter(input3)).toEqual(expected3);
    expect(capitalizeFirstLetter(input4)).toEqual(expected4);
  });

  it('should handle empty string', () => {
    const input = '';
    const expected = '';

    expect(capitalizeFirstLetter(input)).toEqual(expected);
  });

  it('should handle non-string input', () => {
    // @ts-expect-error
    const input1 = null;
    // @ts-expect-error
    const input2 = undefined;
    const input3 = 42;
    const input4 = {};

    // All non-string inputs should return an empty string
    const expected = '';

    expect(capitalizeFirstLetter(input1)).toEqual(expected);
    expect(capitalizeFirstLetter(input2)).toEqual(expected);
    // @ts-expect-error
    expect(capitalizeFirstLetter(input3)).toEqual(expected);
    // @ts-expect-error
    expect(capitalizeFirstLetter(input4)).toEqual(expected);
  });
});
