import { render, screen } from '@testing-library/react';
import MasonryGrid from './MasonryGrid';
import { ItemsVitualized } from '../../hooks/useSearch';

// Mock the GridItem component
jest.mock('./GridItem', () => {
  return function MockGridItem(props: any) {
    return <div data-testid={`grid-item-${props.id}`}>Grid Item {props.id}</div>;
  };
});

const mockItems = new Map<number, ItemsVitualized>([
  [1, {
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
    x: 0,
    y: 0,
  }],
  [2, {
    id: 2,
    width: 800,
    height: 600,
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
    x: 316,
    y: 0,
  }],
]);

describe('MasonryGrid Component', () => {
  it('renders grid items when not loading and no error', () => {
    render(
      <MasonryGrid 
        items={mockItems} 
        isLoading={false} 
        error={null} 
        maxY={600} 
      />
    );

    expect(screen.getByTestId('grid-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('grid-item-2')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    const errorMessage = 'Failed to load images';
    render(
      <MasonryGrid 
        items={mockItems} 
        isLoading={false} 
        error={errorMessage} 
        maxY={600} 
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows "No results found" when items are empty', () => {
    render(
      <MasonryGrid 
        items={new Map()} 
        isLoading={false} 
        error={null} 
        maxY={600} 
      />
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('applies correct container height', () => {
    render(
      <MasonryGrid 
        items={mockItems} 
        isLoading={false} 
        error={null} 
        maxY={800} 
      />
    );

    const container = screen.getByTestId('grid-container');
    expect(container).toHaveStyle({ height: '800px' });
  });

  it('renders grid container with correct styling', () => {
    render(
      <MasonryGrid 
        items={mockItems} 
        isLoading={false} 
        error={null} 
        maxY={600} 
      />
    );

    const container = screen.getByTestId('grid-container');
    expect(container).toHaveStyle({
      position: 'relative',
      width: '100vw',
    });
  });
}); 