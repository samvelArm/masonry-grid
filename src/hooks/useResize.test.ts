import { renderHook, act } from '@testing-library/react';
import { useResize } from './useResize';
import { COLUMN_WIDTH, COLUMN_GAP } from '../constants';

const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
});

describe('useResize', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockInnerWidth(1200);
  });

  afterEach(() => {
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();
  });

  it('should initialize with current window width and calculated columns', () => {
    mockInnerWidth(1200);
    
    const { result } = renderHook(() => useResize());
    
    expect(result.current.windowWidth).toBe(1200);
    expect(result.current.columns).toBe(5);
  });

  it('should calculate correct number of columns for different window widths', () => {
    const testCases = [
      { width: 200, expectedColumns: 0 }, // Too small for even one column
      { width: 216, expectedColumns: 1 }, // Exactly one column
      { width: 432, expectedColumns: 2 }, // Exactly two columns
      { width: 648, expectedColumns: 3 }, // Exactly three columns
      { width: 1000, expectedColumns: 4 }, // Math.floor(1000 / 216) = 4
      { width: 1200, expectedColumns: 5 }, // Math.floor(1200 / 216) = 5
      { width: 2000, expectedColumns: 9 }, // Math.floor(2000 / 216) = 9
    ];

    testCases.forEach(({ width, expectedColumns }) => {
      mockInnerWidth(width);
      const { result } = renderHook(() => useResize());
      
      expect(result.current.windowWidth).toBe(width);
      expect(result.current.columns).toBe(expectedColumns);
    });
  });

  it('should add resize event listener on mount', () => {
    renderHook(() => useResize());
    
    expect(mockAddEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(mockAddEventListener).toHaveBeenCalledTimes(1);
  });

  it('should remove resize event listener on unmount', () => {
    const { unmount } = renderHook(() => useResize());
    
    unmount();
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(mockRemoveEventListener).toHaveBeenCalledTimes(1);
  });

  it('should update columns and window width when window is resized', () => {
    mockInnerWidth(1200);
    const { result } = renderHook(() => useResize());
    
    // Initial state
    expect(result.current.windowWidth).toBe(1200);
    expect(result.current.columns).toBe(5);
    
    // Simulate window resize
    act(() => {
      mockInnerWidth(800);
      // Get the resize handler that was registered
      const resizeHandler = mockAddEventListener.mock.calls[0][1];
      resizeHandler();
    });
    
    // Should update to new values
    expect(result.current.windowWidth).toBe(800);
    expect(result.current.columns).toBe(3); // Math.floor(800 / 216) = 3
  });

  it('should handle multiple resize events', () => {
    mockInnerWidth(1200);
    const { result } = renderHook(() => useResize());
    
    const resizeHandler = mockAddEventListener.mock.calls[0][1];
    
    // First resize
    act(() => {
      mockInnerWidth(600);
      resizeHandler();
    });
    
    expect(result.current.windowWidth).toBe(600);
    expect(result.current.columns).toBe(2); // Math.floor(600 / 216) = 2
    
    // Second resize
    act(() => {
      mockInnerWidth(400);
      resizeHandler();
    });
    
    expect(result.current.windowWidth).toBe(400);
    expect(result.current.columns).toBe(1); // Math.floor(400 / 216) = 1
    
    // Third resize
    act(() => {
      mockInnerWidth(1500);
      resizeHandler();
    });
    
    expect(result.current.windowWidth).toBe(1500);
    expect(result.current.columns).toBe(6); // Math.floor(1500 / 216) = 6
  });

  it('should maintain consistent state across re-renders', () => {
    mockInnerWidth(1000);
    const { result, rerender } = renderHook(() => useResize());
    
    const initialColumns = result.current.columns;
    const initialWidth = result.current.windowWidth;
    
    rerender();
    
    expect(result.current.columns).toBe(initialColumns);
    expect(result.current.windowWidth).toBe(initialWidth);
  });
}); 