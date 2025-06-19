import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DetailedView from './index';

jest.mock('react-router', () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useParams: () => ({ id: '123' }),
}));

jest.mock('../services/pexels', () => ({
  fetchPexelsPhotoById: jest.fn(),
}));

jest.mock('../../components/LoadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

const mockPhoto = {
  id: 123,
  width: 1920,
  height: 1080,
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
  alt: 'Test photo',
  avg_color: '#ff0000',
  url: 'https://example.com/photo/123',
  photographer: 'Test Photographer',
  photographer_url: 'https://example.com/photographer',
  photographer_id: 456,
};

describe('DetailedView Component', () => {
  let mockFetchPexelsPhotoById: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchPexelsPhotoById = require('../services/pexels').fetchPexelsPhotoById;
    mockFetchPexelsPhotoById.mockResolvedValue(mockPhoto);
  });

  it('renders loading state initially', async () => {
    render(<DetailedView />);

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  it('renders photo details when loaded', async () => {
    render(<DetailedView />);
    
    await waitFor(() => {
      expect(screen.getByAltText('Test photo')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Photographer')).toBeInTheDocument();
  });

  it('renders back button with correct link', async () => {
    render(<DetailedView />);
    
    await waitFor(() => {
      expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });
  });

  it('displays error message when API fails', async () => {
    const errorMessage = 'Failed to fetch photo';
    mockFetchPexelsPhotoById.mockRejectedValueOnce(new Error(errorMessage));
    
    render(<DetailedView />);
    
    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('renders image with correct src', async () => {
    render(<DetailedView />);
    
    await waitFor(() => {
      expect(screen.getByAltText('Test photo')).toHaveAttribute('src', 'https://example.com/original.jpg');
    });
  });

  it('renders photographer link with correct href', async () => {
    render(<DetailedView />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Photographer')).toBeInTheDocument();
    });
    
    const photographerLink = screen.getByText('Test Photographer');
    expect(photographerLink).toHaveAttribute('href', 'https://example.com/photographer');
    expect(photographerLink).toHaveAttribute('target', '_blank');
    expect(photographerLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows image loading state initially', async () => {
    render(<DetailedView />);
    
    await waitFor(() => {
      expect(screen.getByAltText('Test photo')).toHaveStyle({ opacity: '0' });
    });
  });

  it('shows image when loaded', async () => {
    render(<DetailedView />);
    
    await waitFor(() => {
      expect(screen.getByAltText('Test photo')).toBeInTheDocument();
    });
    
    const image = screen.getByAltText('Test photo');
    fireEvent.load(image);
    
    await waitFor(() => {
      expect(image).toHaveStyle({ opacity: '1' });
    });
  });
}); 