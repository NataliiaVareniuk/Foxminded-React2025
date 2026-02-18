import { render, screen,  userEvent } from '@testing-library/react';
import Input from './Input';
import { expect } from 'vitest';

describe('Input', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('should render input with label', () => {
    render(<Input label="password" name="password" />);

    const input = screen.getByLabelText(/password/i);
    expect(input).toBeInTheDocument();
  });

  test('should show password when toggle button clicked', async () => {
    render(<Input label="Password" name="password" type="password" />);

    const input = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    
    await user.click(toggleButton);
    expect(input.type).toBe('text');
   
  });

    test('should hide password when hide button clicked', async () => {
    render(<Input label="Password" name="password" type="password" />);

    const input = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /show password/i });
   
    await user.click(toggleButton);
    const hidePass = screen.getByRole('button', { name: /hide password/i });
    await user.click(hidePass);

    expect(input.type).toBe('password');
   
  });

  test('should not toggle password visibility when disabled', async () => {
    render(<Input disabled type="password" />);

    const input = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    await user.click(toggleButton);

    expect(input.disabled).toBe(true);
    expect(input.type).toBe('password');
    expect(toggleButton.disabled).toBe(true);
    
  });

  test('should display error message ', () => {
    render(<Input error={'Error message'} />);

    const error = screen.getByText('Error message');
    const errorElement = error.parentElement;

    expect(error).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('aria-live', 'assertive');
  });

  test('should not display error message when error is empty', () => {
    render(<Input error={''} />);

    const error = screen.queryByText('Error message');

    expect(error).not.toBeInTheDocument();
  });

  test('should render input with error and correct type', () => {
    render(<Input error={'Error message'} type="password" />);

    const input = screen.getByLabelText(/password/i);
    const error = screen.getByText('Error message');
    const errorElement = error.parentElement;

    expect(input).toBeInTheDocument();
    expect(input.type).toBe('password');
    expect(error).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('aria-live', 'assertive');
  });
});
