import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from './index';

jest.mock('../LoadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('Search Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders search input with placeholder', () => {
    render(<Search query="" onChange={mockOnChange} loading={false} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('displays loading spinner when loading is true', () => {
    render(<Search query="" onChange={mockOnChange} loading={true} />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('does not display loading spinner when loading is false', () => {
    render(<Search query="" onChange={mockOnChange} loading={false} />);
    
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('disables input when loading is true', () => {
    render(<Search query="" onChange={mockOnChange} loading={true} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeDisabled();
  });

  it('enables input when loading is false', () => {
    render(<Search query="" onChange={mockOnChange} loading={false} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).not.toBeDisabled();
  });

  it('debounces input changes', async () => {
    render(<Search query="" onChange={mockOnChange} loading={false} />);
    
    const input = screen.getByPlaceholderText('Search...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnChange).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('test');
    });
  });

  it('cancels previous debounce when typing quickly', async () => {
    render(<Search query="" onChange={mockOnChange} loading={false} />);
    
    const input = screen.getByPlaceholderText('Search...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    jest.advanceTimersByTime(150); 
    
    fireEvent.change(input, { target: { value: 'testing' } });
    jest.advanceTimersByTime(300); 
    
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
    
    expect(mockOnChange).toHaveBeenCalledWith('testing');
  });

  it('sets input value from query prop', () => {
    render(<Search query="initial value" onChange={mockOnChange} loading={false} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('initial value');
  });
}); 