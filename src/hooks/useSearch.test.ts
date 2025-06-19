import { renderHook, waitFor } from '@testing-library/react';
import { useSearch } from './useSearch';

jest.mock('../pages/services/pexels', () => ({
  fetchPexelsPhotos: jest.fn(),
}));

jest.mock('./useResize', () => ({
  useResize: () => ({
    columns: 3,
    windowWidth: 1200,
  }),
}));

jest.mock('./useScroll', () => ({
  useScroll: () => ({
    scrollPosition: 0,
  }),
}));

const mockPhotos = [
  {
    id: 1,
    width: 800,
    height: 600,
    src: {
      original: 'https://example.com/1.jpg',
      large2x: 'https://example.com/1-large2x.jpg',
      large: 'https://example.com/1-large.jpg',
      medium: 'https://example.com/1-medium.jpg',
      small: 'https://example.com/1-small.jpg',
      portrait: 'https://example.com/1-portrait.jpg',
      landscape: 'https://example.com/1-landscape.jpg',
      tiny: 'https://example.com/1-tiny.jpg',
    },
    alt: 'Test image 1',
    avg_color: '#ff0000',
    url: 'https://example.com/photo/1',
    photographer: 'Photographer 1',
    photographer_url: 'https://example.com/photographer1',
    photographer_id: 1,
  },
  {
    id: 2,
    width: 800,
    height: 400,
    src: {
      original: 'https://example.com/2.jpg',
      large2x: 'https://example.com/2-large2x.jpg',
      large: 'https://example.com/2-large.jpg',
      medium: 'https://example.com/2-medium.jpg',
      small: 'https://example.com/2-small.jpg',
      portrait: 'https://example.com/2-portrait.jpg',
      landscape: 'https://example.com/2-landscape.jpg',
      tiny: 'https://example.com/2-tiny.jpg',
    },
    alt: 'Test image 2',
    avg_color: '#00ff00',
    url: 'https://example.com/photo/2',
    photographer: 'Photographer 2',
    photographer_url: 'https://example.com/photographer2',
    photographer_id: 2,
  },
];

const mockFetchPexelsPhotos = require('../pages/services/pexels').fetchPexelsPhotos;

describe('useSearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchPexelsPhotos.mockResolvedValue({
      photos: mockPhotos,
      next_page: 'https://api.pexels.com/v1/search?page=2',
      page: 1,
      per_page: 40,
      total_results: 100,
    });
  });

  it('initializes with default state', async () => {
    const { result } = renderHook(() => useSearch({ query: '' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });
    expect(result.current.error).toBe(null);
    expect(result.current.items.size).toBe(0);
    expect(result.current.maxY).toBe(0);
  });

  it('fetches photos on mount', async () => {
    mockFetchPexelsPhotos.mockResolvedValue({
      photos: mockPhotos,
      next_page: 'https://api.pexels.com/v1/search?page=2',
      page: 1,
      per_page: 40,
      total_results: 100,
    });

    const { result } = renderHook(() => useSearch({ query: 'test' }));

    await waitFor(() => {
      expect(mockFetchPexelsPhotos).toHaveBeenCalledWith({
        perPage: 40,
        page: 1,
        query: 'test',
      });
    });

    await waitFor(() => {
      expect(result.current.items.size).toBe(2);
    });
  });

  it('handles API errors', async () => {
    const errorMessage = 'API Error';
    mockFetchPexelsPhotos.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useSearch({ query: 'test' }));

    await waitFor(() => {
      expect(result.current.error).toContain(errorMessage);
    });
  });

  it('resets state when query changes', async () => {
    mockFetchPexelsPhotos.mockResolvedValue({
      photos: mockPhotos,
      next_page: 'https://api.pexels.com/v1/search?page=2',
      page: 1,
      per_page: 40,
      total_results: 100,
    });

    const { result, rerender } = renderHook(
      ({ query }) => useSearch({ query }),
      { initialProps: { query: 'initial' } }
    );

    await waitFor(() => {
      expect(result.current.items.size).toBe(2);
    });

    rerender({ query: 'new' });

    await waitFor(() => {
      expect(result.current.items.size).toBe(0);
    });
    
    expect(result.current.error).toBe(null);
  });

  it('calculates item positions correctly', async () => {
    mockFetchPexelsPhotos.mockResolvedValue({
      photos: mockPhotos,
      next_page: 'https://api.pexels.com/v1/search?page=2',
      page: 1,
      per_page: 40,
      total_results: 100,
    });

    const { result } = renderHook(() => useSearch({ query: 'test' }));

    await waitFor(() => {
      expect(result.current.items.size).toBe(2);
    });

    const items = Array.from(result.current.items.values());
    
    expect(items[0]).toHaveProperty('x');
    expect(items[0]).toHaveProperty('y');
    expect(items[0]).toHaveProperty('width');
    expect(items[0]).toHaveProperty('height');
  });

  it('handles empty search results', async () => {
    mockFetchPexelsPhotos.mockResolvedValue({
      photos: [],
      next_page: '',
      page: 1,
      per_page: 40,
      total_results: 0,
    });

    const { result } = renderHook(() => useSearch({ query: 'nonexistent' }));

    await waitFor(() => {
      expect(result.current.items.size).toBe(0);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
  });
}); 