import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import Dropdown from './Dropdown';
import { expect } from 'vitest';

import { vi } from 'vitest';

vi.mock('./Dropdown.module.scss', () => ({
  active: 'active',
}));

describe('Dropdown', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('should render Dropdown button', () => {
    render(<Dropdown />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('should open menu when dropdown button is clicked', async () => {
    render(<Dropdown />);

    const button = screen.getByRole('button', { name: /select/i });
    await user.click(button);

    const optionDay = screen.getByRole('button', { name: /day/i });
    const optionWeek = screen.getByRole('button', { name: /week/i });

    expect(optionDay).toBeInTheDocument();
    expect(optionWeek).toBeInTheDocument();
  });

  test('should display menu options when dropdown button is clicked', async () => {
    render(<Dropdown />);

    const button = screen.getByRole('button', { name: /select/i });

    await user.click(button);

    const optionDay = screen.getByText('Day');
    const optionWeek = screen.getByText('Week');

    expect(button).toBeInTheDocument();
    expect(optionDay).toBeInTheDocument();
    expect(optionWeek).toBeInTheDocument();
  });

  test('should select day option and update button text', async () => {
    const handleChange = vi.fn();

    render(<Dropdown onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select/i });
    const optionDay = screen.getByRole('button', { name: /day/i });

    await user.click(button);
    await user.click(optionDay);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('day');
    expect(button).toHaveTextContent('Day');
  });

  test('should select week option and update button text', async () => {
    const handleChange = vi.fn();

    render(<Dropdown onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select/i });
    const optionWeek = screen.getByRole('button', { name: /week/i });

    await user.click(button);
    await user.click(optionWeek);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('week');
    expect(button).toHaveTextContent('Week');
  });

  test('should add active class when dropdown button is clicked', async () => {
    const handleChange = vi.fn();

    render(<Dropdown onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select/i });

    await user.click(button);

    expect(button).toHaveClass('active');

  });

  test('should remove active class when dropdown button is clicked again', async () => {
    const handleChange = vi.fn();

    render(<Dropdown onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select/i });

    await user.click(button);
    expect(button).toHaveClass('active');

    await user.click(button);
    expect(button).not.toHaveClass('active');
   });

  test('should close menu when clicking outside ', async () => {
    const handleChange = vi.fn();
    render(<Dropdown onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /select/i });

    await user.click(button);
    fireEvent.click(document.body);

     expect(button).toHaveClass(active);
       expect(
      screen.queryByRole('button', { name: /day/i }),
    ).not.toBeInTheDocument();
    
  });
});
