import { throttle, getNextIndex } from './index';

describe('Utils', () => {
  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call the function immediately on first call', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('test');

      expect(mockFn).toHaveBeenCalledWith('test');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should throttle subsequent calls within the delay period', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      // First call - should execute immediately
      throttledFn('first');
      expect(mockFn).toHaveBeenCalledWith('first');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Second call within delay - should be throttled
      throttledFn('second');
      expect(mockFn).toHaveBeenCalledTimes(1); // Still only called once

      // Advance time by 50ms (less than delay)
      jest.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledTimes(1); // Still throttled

      // Advance time to complete the delay
      jest.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledWith('second');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should execute the latest call after the delay', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      // First call
      throttledFn('first');
      expect(mockFn).toHaveBeenCalledWith('first');

      // Multiple calls within delay
      throttledFn('second');
      throttledFn('third');
      throttledFn('fourth');

      expect(mockFn).toHaveBeenCalledTimes(1); // Only first call executed

      // Advance time to complete delay
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('fourth'); // Latest call executed
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('getNextIndex', () => {
    it('should return the column with minimum Y value', () => {
      const yMap = new Map([
        [0, 100],
        [1, 50],
        [2, 200],
        [3, 75]
      ]);
      const columns = 4;

      const result = getNextIndex(yMap, columns);

      expect(result).toEqual({ minCol: 1, minY: 50 });
    });

    it('should handle single column', () => {
      const yMap = new Map([[0, 100]]);
      const columns = 1;

      const result = getNextIndex(yMap, columns);

      expect(result).toEqual({ minCol: 0, minY: 100 });
    });

    it('should handle equal Y values', () => {
      const yMap = new Map([
        [0, 100],
        [1, 100],
        [2, 100]
      ]);
      const columns = 3;

      const result = getNextIndex(yMap, columns);

      expect(result).toEqual({ minCol: 0, minY: 100 });
    });

    it('should handle zero Y values', () => {
      const yMap = new Map([
        [0, 0],
        [1, 100],
        [2, 200]
      ]);
      const columns = 3;

      const result = getNextIndex(yMap, columns);

      expect(result).toEqual({ minCol: 0, minY: 0 });
    });
  });
}); 