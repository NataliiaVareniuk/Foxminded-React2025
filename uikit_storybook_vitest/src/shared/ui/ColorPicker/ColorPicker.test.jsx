import { render, userEvent, screen } from '@testing-library/react';
import ColorPicker from './ColorPicker';
import { expect, test } from 'vitest';

vi.mock('./ColorPicker.module.scss', () => ({
  selected: 'selected',
}));

describe('ColorPicker', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('should render color input', () => {
    render(
      <ColorPicker value="#ffffff" onSelect={() => {}} onChange={() => {}} />,
    );

    const input = screen.getByLabelText(/pick color/i);
    expect(input).toBeInTheDocument();
  });

  test('should add selected class when selected prop is true', () => {
    render(
      <ColorPicker
        value="#ffffff"
        selected={true}
        onSelect={() => {}}
        onChange={() => {}}
      />,
    );
    const container = screen.getByLabelText(/pick color/i).parentElement;
    expect(container).toHaveClass('selected');
  });

  test('should apply correct background color and input value', () => {
    render(
      <ColorPicker
        value="#e72525"
        selected={true}
        onSelect={() => {}}
        onChange={() => {}}
      />,
    );
    const input = screen.getByLabelText(/pick color/i);
    const container = input.parentElement;

    expect(input).toHaveValue('#e72525');
    expect(container).toHaveStyle({ backgroundColor: '#e72525' });
  });

  test('should call onSelect when input is clicked', async () => {
    const handleSelect = vi.fn();
    render(
      <ColorPicker
        value="#ffffff"
        onSelect={handleSelect}
        onChange={() => {}}
      />,
    );
    const input = screen.getByLabelText(/pick color/i);
    await user.click(input);
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  test('should call onChange when color is changed', async () => {
    const handleChange = vi.fn();
    render(
      <ColorPicker
        value="#ffffff"
        onSelect={() => {}}
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText(/pick color/i);
    await user.type(input,'#e72525');
    expect(handleChange).toHaveBeenCalledWith('#e72525');
  });

  test('should stop propagation on input click', async () => {
    const handleSelect = vi.fn();
    const handleParentClick = vi.fn();

    render(
      <div onClick={handleParentClick}>
        <ColorPicker
          value="#ffffff"
          onSelect={handleSelect}
          onChange={() => {}}
        />
      </div>,
    );
    const input = screen.getByLabelText(/pick color/i);
    await userEvent.click(input);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleParentClick).not.toHaveBeenCalled();
  });

  test('renders without crashing when callbacks are undefined', () => {
    render(<ColorPicker value="#ffffff" />);
    const input = screen.getByLabelText(/pick color/i);
    expect(input).toBeInTheDocument();
  });
});
