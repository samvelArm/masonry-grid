import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Grid from './index';

jest.mock('../../hooks/useSearch', () => ({
  useSearch: jest.fn(),
}));

jest.mock('./MasonryGrid', () => {
  return function MockMasonryGrid(props: any) {
    return (
      <div data-testid="masonry-grid">
        {props.isLoading && <div data-testid="grid-loading">Loading...</div>}
        {props.error && <div data-testid="grid-error">{props.error}</div>}
        {!props.isLoading && !props.error && (
          <div data-testid="grid-items">
            {Array.from(props.items.values()).map((item: any) => (
              <div key={item.id} data-testid={`grid-item-${item.id}`}>
                {item.alt}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
});

jest.mock('../../components/Search', () => ({
  Search: ({ query, onChange, loading }: any) => (
    <div data-testid="search-component">
      <input
        data-testid="search-input"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        placeholder="Search..."
      />
      {loading && <div data-testid="search-loading">Searching...</div>}
    </div>
  ),
}));

const mockUseSearch = require('../../hooks/useSearch').useSearch;

describe('Grid Page', () => {
  const mockItems = new Map([
    [1, { id: 1, alt: 'Test Image 1', x: 0, y: 0, width: 300, height: 200 }],
    [2, { id: 2, alt: 'Test Image 2', x: 316, y: 0, width: 300, height: 150 }],
  ]);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search component and masonry grid', () => {
    mockUseSearch.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      maxY: 400,
    });

    render(<Grid />);

    expect(screen.getByTestId('search-component')).toBeInTheDocument();
    expect(screen.getByTestId('masonry-grid')).toBeInTheDocument();
  });

  it('passes loading state to components', () => {
    mockUseSearch.mockReturnValue({
      items: mockItems,
      loading: true,
      error: null,
      maxY: 400,
    });

    render(<Grid />);

    expect(screen.getByTestId('search-loading')).toBeInTheDocument();
    expect(screen.getByTestId('grid-loading')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to load images';
    mockUseSearch.mockReturnValue({
      items: new Map(),
      loading: false,
      error: errorMessage,
      maxY: 0,
    });

    render(<Grid />);

    expect(screen.getByTestId('grid-error')).toHaveTextContent(errorMessage);
  });

  it('displays grid items when data is loaded', () => {
    mockUseSearch.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      maxY: 400,
    });

    render(<Grid />);

    expect(screen.getByTestId('grid-item-1')).toHaveTextContent('Test Image 1');
    expect(screen.getByTestId('grid-item-2')).toHaveTextContent('Test Image 2');
  });

  it('updates search query when user types', async () => {
    mockUseSearch.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      maxY: 400,
    });

    render(<Grid />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'new search' } });

    await waitFor(() => {
      expect(searchInput).toHaveValue('new search');
    });
  });

  it('disables search input when loading', () => {
    mockUseSearch.mockReturnValue({
      items: mockItems,
      loading: true,
      error: null,
      maxY: 400,
    });

    render(<Grid />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeDisabled();
  });

  it('enables search input when not loading', () => {
    mockUseSearch.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      maxY: 400,
    });

    render(<Grid />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).not.toBeDisabled();
  });

  it('passes correct props to MasonryGrid', () => {
    mockUseSearch.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      maxY: 400,
    });

    render(<Grid />);

    const masonryGrid = screen.getByTestId('masonry-grid');
    expect(masonryGrid).toBeInTheDocument();
  });
}); 