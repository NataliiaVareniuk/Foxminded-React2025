
import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import TimeSelect from './TimeSelect';
import { expect } from 'vitest';

vi.mock('./TimeSelect.module.scss', () => ({
  selected: 'selected',
}));

describe('TimeSelect', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  test('should render button with default or provided value', () => {
    render(<TimeSelect />);

    const button = screen.getByRole('button', { name: /12:30 pm|select/i });

    expect(button).toBeInTheDocument();
  });

  test('should open the list when the button is clicked', async () => {
    const handleChange = vi.fn();
    render(<TimeSelect onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select|12:30 pm/i });
    await user.click(button);

    const item = screen.getByRole('button', { name: /00:00|12:00/i });
    expect(item).toBeInTheDocument();
  });

  test('should select a time from list', async () => {
    const handleChange = vi.fn();
    render(<TimeSelect onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select|12:30 pm/i });
    await user.click(button);

    const itemToSelect = screen.getByRole('button', { name: /12:00 pm/i });
    await user.click(itemToSelect);

    const newItemToSelect = screen.queryByRole('button', { name: /00:00|12:00/i, });
   
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('12:00 pm');
    expect(newItemToSelect).not.toBeInTheDocument();
  });

  test('should close menu when clicking outside ', async () => {
    const handleChange = vi.fn();

    render(<TimeSelect onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select|12:30 pm/i });

    await user.click(button);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
   
  });

  test('should highlighting selected time', async () => {
    const handleChange = vi.fn();
    render(<TimeSelect onChange={handleChange} value={'12:30 pm'} />);

    const button = screen.getByRole('button', { name: /12:30 pm/i });
    const itemNotSelect = screen.getByRole('button', { name: /12:00 pm/i });
    const itemToSelect = screen.getByRole('button', { name: /12:30 pm/i });

    await user.click(button);
    
    expect(itemNotSelect).toBeInTheDocument();
    expect(itemNotSelect).not.toHaveClass('selected');
    expect(itemToSelect).toBeInTheDocument();
    expect(itemToSelect).toHaveClass('selected');
  });

  test('should have only one selected button', async () => {
    const handleChange = vi.fn();
    render(<TimeSelect onChange={handleChange} value={'12:30 pm'} />);
    
    const button = screen.getByRole('button', { name: /12:30 pm/i });
    await user.click(button);

    const buttons = screen.getAllByRole('button', { name: /pm|am/i });
    const selectedBtn = buttons.filter((btn) =>
      btn.classList.contains('selected'),
    );
    expect(selectedBtn).toHaveLength(1);
    expect(selectedBtn[0]).toHaveTextContent('12:30 pm');
  });

  test('should not highlight any option if the value is not in the list', async () => {
    const handleChange = vi.fn();
    render(<TimeSelect onChange={handleChange} value={'33:30 pm'} />);

    const button = screen.getByRole('button', { name: /33:30 pm/i });
    await user.click(button);

    const buttons = screen.getAllByRole('button', { name: /pm|am/i });
    const selectedBtn = buttons.filter((btn) =>
      btn.classList.contains('selected'),
    );

    expect(selectedBtn).toHaveLength(0);
  });

  test('should set correct aria attributes', async () => {
    const handleChange = vi.fn();
    render(<TimeSelect onChange={handleChange} />);
    const button = screen.getByRole('button', { name: /select|12:30 pm/i });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(document.body);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
