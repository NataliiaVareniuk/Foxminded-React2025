import { render, screen, userEvent } from '@testing-library/react';
import Button from './Button';
import { vi } from 'vitest';



describe('Button', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('should render button with text', () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button', { name: /Button/i });
    expect(button).toBeInTheDocument();
  });

  test('should call onClick when clicked', async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Button</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        {' '}
        Button
      </Button>,
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should apply secondary variant class', () => {
    render(<Button variant="secondary">Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(expect.stringContaining('secondary'));
  });

  test('should apply correct size class', () => {
    render(<Button size="l">Large</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toMatch(/size_l/);
  });

  test('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('should render icon when iconSrc is provided', () => {
    render(<Button iconSrc="/icon.svg">Button</Button>);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  test("should fall back to size 's' when invalid size prop is provided", () => {
    render(<Button size="wrong">Button</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toMatch(/size_s/);
  });

  test('should apply primary variant by default', () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toMatch(/primary/);
  });
});
