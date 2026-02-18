
import { render, screen } from '@testing-library/react';
import Link from './Link';

vi.mock('./Link.module.scss', () => ({
   disabled: 'disabled',
}));


describe('Link', () => {
  test('should render link with href', () => {
    render(<Link href="https://example.com">Click</Link>);

    const link = screen.getByRole('link', { name: /click/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).not.toHaveAttribute('aria-disabled');
    expect(link).toHaveAttribute('tabIndex', '0');
   
  });

  test('should render disabled link', () => {
    render(
      <Link disabled href="https://example.com">
        Click
      </Link>,
    );

    const link = screen.getByRole('link', { name: /click/i });

    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabIndex', '-1');
    expect(link).toHaveClass('disabled');
  });
});
