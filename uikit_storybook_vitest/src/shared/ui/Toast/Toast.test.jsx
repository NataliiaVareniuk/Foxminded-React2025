import { render, screen, userEvent } from '@testing-library/react';
import Toast from './Toast';
import { expect } from 'vitest';


describe('Toast', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  test('should render the message', () => {
    const handleClose = vi.fn();
    render(<Toast message="Success!" onClose={handleClose} />);

    expect(screen.getByText(/success!/i)).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(<Toast message="Test" isOpen onClose={handleClose} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClose).toHaveBeenCalled();
  });

  test('should not start timer if isOpen is false', () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    render(
      <Toast
        message="Test"
        isOpen={false}
        onClose={handleClose}
        duration={5000}
      />,
    );
    vi.advanceTimersByTime(5000);
    expect(handleClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  test('should close automatically after the specified duration', () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    render(<Toast message="Test" onClose={handleClose} duration={300} />);

    vi.advanceTimersByTime(300);

    expect(handleClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  test('should not render if isOpen is false', () => {
    const handleClose = vi.fn();
    render(<Toast message="Test" isOpen={false} onClose={handleClose} />);

    const toastElement = screen.queryByText(/Test/i);
    const closeButton = screen.queryByRole('button');

    expect(toastElement).not.toBeInTheDocument();
    expect(closeButton).not.toBeInTheDocument();
  });
});
