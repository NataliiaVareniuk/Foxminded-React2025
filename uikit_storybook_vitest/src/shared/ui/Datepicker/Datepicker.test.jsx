import { fireEvent, userEvent } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import Datepicker from './Datepicker';
import { expect, test } from 'vitest';

vi.mock('./Datepicker.module.scss', () => ({
  selectedDay: '  selectedDay',
  dayToday: ' dayToday',
  dayOfMonth: ' dayOfMonth',
  dayInactive: ' dayInactive',
}));



describe('Datepicker', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('should render calendar with month, year, navigation buttons, day headers, and today highlighted', () => {
    render(<Datepicker />);

    const button = screen.getByRole('button');
    const monthYear = screen.getByText(/\d{4}/);
    const month = screen.getByText(/^May$/i);
    const prevButton = screen.getByRole('button', { name: 'Previous month' });
    const nextButton = screen.getByRole('button', { name: 'Next month' });
    const dayHeaders = screen.getAllByText(/^(Su|Mo|Tu|We|Th|Fr|Sa)$/);
    const dateCells = screen.getAllByRole('button', { name: /\d+/ });
    const todayCell = screen.getByRole('button', { name: /^15$/ });

    expect(monthYear).toBeInTheDocument();
    expect(month).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(dayHeaders.length).toBe(7);
    expect(dateCells.length).toBeGreaterThanOrEqual(28);
    expect(button).toBeInTheDocument();

    expect(todayCell).toBeInTheDocument();
    expect(todayCell).toHaveClass('dayToday');
    vi.useRealTimers();
  });

  test('should update year correctly when navigating to next months', async () => {
    const december = new Date(2025, 11, 15);

    render(<Datepicker value={december} />);

    const monthYear = screen.getByText(/\d{4}/);
    const nextButton = screen.getByRole('button', { name: 'Next month' });
   
    await user.click(nextButton);
    
    expect(monthYear.textContent).toContain('2026');  
    
  });


   test('should return to initial year when navigating back to previous month', async () => {
    const december = new Date(2025, 11, 15);

    render(<Datepicker value={december} />);

    const monthYear = screen.getByText(/\d{4}/);
    const nextButton = screen.getByRole('button', { name: 'Next month' });
    const prevButton = screen.getByRole('button', { name: 'Previous month' });

    await user.click(nextButton);
    await user.click(prevButton);

    expect(monthYear.textContent).toBe('2025');
  
  });

  test('should navigate 12 months back correctly', async () => {
    const december = new Date(2025, 11, 15);

    render(<Datepicker value={december} />);

    const monthYear = screen.getByText(/\d{4}/);
    const prevButton = screen.getByRole('button', { name: 'Previous month' });

    for (let i = 0; i < 12; i++) {
      await user.click(prevButton);
    }

    expect(monthYear.textContent).toBe('2024');
  
  });

  test('should call onChange callback when a date is selected', async () => {
    const handleChange = vi.fn();
    render(<Datepicker onChange={handleChange} />);

    const today = new Date().getDate().toString();
    const button = screen.getByRole('button', { name: today });

    await user.click(button);
    expect(handleChange).toHaveBeenCalled();
  });

  test('should highlight correct date when value prop is provided', () => {
    const selectedDate = new Date(2026, 1, 18);
    render(<Datepicker value={selectedDate} />);
    const selectedDateCell = screen.getByRole('button', { name: '18' });

    expect(selectedDateCell).toBeInTheDocument();
    expect(selectedDateCell).toHaveClass('selectedDay');
  });

  test('should clear selected date when clicking outside', () => {
    const selectedDate = new Date(2026, 1, 18);
    const handleChange = vi.fn();

    render(<Datepicker value={selectedDate} onChange={handleChange} />);

    const selectedDateCell = screen.getByRole('button', { name: '18' });

    fireEvent.mouseDown(document.body);

    expect(selectedDateCell).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalled();
    expect(selectedDateCell).not.toHaveClass('selectedDay');
  });

  test('should navigate to next and previous months correctly', async () => {
    render(<Datepicker />);
    const monthYear = screen.getByText(/\d{4}/);
    const initialMonthYear = monthYear.textContent;
    const nextButton = screen.getByRole('button', { name: 'Next month' });
    const prevButton = screen.getByRole('button', { name: 'Previous month' });

    await user.click(nextButton);
    expect(monthYear.textContent).not.toBe(initialMonthYear);

    await user.click(prevButton);
    expect(monthYear.textContent).toBe(initialMonthYear);
  });

  test('should apply custom className prop to the root element', () => {
    const { container } = render(<Datepicker className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('should set type="button" for all buttons for accessibility', () => {
    render(<Datepicker />);
    const buttons = screen.getAllByRole('button');

    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  test('should display Sunday as the first day of the week', () => {
    render(<Datepicker />);
    const dayHeaders = screen.getAllByText(/^(Su|Mo|Tu|We|Th|Fr|Sa)$/);
    expect(dayHeaders[0].textContent).toBe('Su');
  });

  test('should highlight today date correctly', () => {
    render(<Datepicker />);
    const todayCell = screen.getByRole('button', { name: /^15$/ });

    expect(todayCell).toBeInTheDocument();
    expect(todayCell).toHaveClass('dayToday');

    vi.useRealTimers();
  });

  test('should not allow clicking on inactive days', () => {
    render(<Datepicker />);
    const inactiveDays = document.querySelectorAll('.dayInactive');

    inactiveDays.forEach((day) => {
      expect(day.querySelector('button')).toBeNull();
    });
  });

  test('should not highlight today when value prop changes month', async () => {
    render(<Datepicker />);

    const nextButton = screen.getByRole('button', { name: 'Next month' });
    const today = screen.queryByRole('button', { name: /^15$/ });

    await user.click(nextButton);

    expect(today).not.toHaveClass('dayToday');

    vi.useRealTimers();
  });
});
