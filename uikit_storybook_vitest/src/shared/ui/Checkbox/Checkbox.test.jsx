import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';
import { userEvent } from '@testing-library/react';
import { vi } from 'vitest';


describe('Checkbox', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });


  test('should render Check Box', () => {
    render(<Checkbox>Text</Checkbox>);

    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
  });

  test('should render checkbox with label text', () => {
    render(<Checkbox>Text</Checkbox>);

    const checkbox = screen.getByLabelText(/Text/i);
    expect(checkbox).toBeInTheDocument();
  });

  test('should call onChange with true when checkbox is clicked from unchecked state', async () => {
    const handleChange = vi.fn();

    render(
      <Checkbox checked={false} onChange={handleChange}>
        Text
      </Checkbox>,
    );

     await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  test('should call onChange with false when checkbox is clicked from checked state', async () => {
    const handleChange = vi.fn();

    render(
      <Checkbox checked={true} onChange={handleChange}>
        Text
      </Checkbox>,
    );

    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  test('should render check icon when checkbox is checked', () => {
    render(<Checkbox checked={true}>Text</Checkbox>);
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
  });

  test('should not render check icon when checkbox is unchecked', () => {
    render(<Checkbox checked={false}>Text</Checkbox>);
    const img = screen.queryByRole('img');

    expect(img).toBeNull();
  });
});
