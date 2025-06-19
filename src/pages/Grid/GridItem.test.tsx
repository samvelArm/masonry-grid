import { render, screen, fireEvent } from '@testing-library/react';
import GridItem from './GridItem';

jest.mock('react-router', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a data-testid="grid-item-link" href={to} {...props}>
      {children}
    </a>
  ),
}));

const mockItem = {
  id: 1,
  width: 800,
  height: 600,
  src: {
    original: 'https://example.com/original.jpg',
    large2x: 'https://example.com/large2x.jpg',
    large: 'https://example.com/large.jpg',
    medium: 'https://example.com/medium.jpg',
    small: 'https://example.com/small.jpg',
    portrait: 'https://example.com/portrait.jpg',
    landscape: 'https://example.com/landscape.jpg',
    tiny: 'https://example.com/tiny.jpg',
  },
  alt: 'Test image',
  avg_color: '#ff0000',
  url: 'https://example.com/photo/1',
  photographer: 'Test Photographer',
  photographer_url: 'https://example.com/photographer',
  photographer_id: 123,
  x: 100,
  y: 200,
};

describe('GridItem Component', () => {
  it('renders with correct positioning', () => {
    render(<GridItem {...mockItem} />);
    
    const item = screen.getByTestId('grid-item-container');
    expect(item).toHaveStyle({
      position: 'absolute',
      left: '100px',
      top: '200px',
    });
  });

  it('renders image with correct src and alt', () => {
    render(<GridItem {...mockItem} />);
    
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', 'https://example.com/medium.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('shows loading state initially', () => {
    render(<GridItem {...mockItem} />);
    
    const image = screen.getByAltText('Test image');
    expect(image).toHaveStyle({ opacity: '0' });
  });

  it('shows image when loaded', () => {
    render(<GridItem {...mockItem} />);
    
    const image = screen.getByAltText('Test image');
    fireEvent.load(image);
    
    expect(image).toHaveStyle({ opacity: '1' });
  });

  it('renders link with correct href', () => {
    render(<GridItem {...mockItem} />);
    
    const item = screen.getByTestId('grid-item-link');
    expect(item).toHaveAttribute('href', '/1');
  });

  it('applies hover effect on image', () => {
    render(<GridItem {...mockItem} />);
    
    const image = screen.getByAltText('Test image');
    expect(image).toHaveStyle({
      transition: 'transform 0.2s ease-in-out',
    });
  });

  it('renders with correct dimensions', () => {
    render(<GridItem {...mockItem} />);
    
    const item = screen.getByTestId('grid-item-container');
    expect(item).toHaveStyle({
      width: '800px',
    });
  });

  it('uses background color during loading', () => {
    render(<GridItem {...mockItem} />);
    
    const item = screen.getByTestId('grid-item-container');
    expect(item).toHaveStyle({
      backgroundColor: '#ff0000',
    });
  });

  it('removes background color after image loads', () => {
    render(<GridItem {...mockItem} />);
    
    const image = screen.getByAltText('Test image');
    const link = screen.getByTestId('grid-item-container');
    
    fireEvent.load(image);
    
    expect(link).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });
}); 