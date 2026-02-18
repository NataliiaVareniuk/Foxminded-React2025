import { useState } from 'react';

export const useDatepicker = (selected, onChange) => {
  const today = new Date();
  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const [currentDate, setCurrentDate] = useState(() =>
    selected
      ? new Date(selected.getFullYear(), selected.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const selectedDate = selected ?? todayWithoutTime;

  const clearSelectedDate = () => {
    onChange?.(null);
  };

  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  );

  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    1,
  );
  const numberOfDays = getDaysInMonth(currentDate);
  const firstDayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const firstDayOfTheMonth = firstDayDate.getDay();
  const numberOfDaysInPreviousMonth = getDaysInMonth(previousMonth);

  const currentYear = currentDate.getFullYear();
  const numberOfDaysToShow = 42;

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const onShowNextMonth = () => {
    setCurrentDate(nextMonth);
  };

  const onShowPrevMonth = () => {
    setCurrentDate(previousMonth);
  };

  const handleSelectDate = (date) => {
    onChange?.(date);
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  return {
    numberOfDays,
    numberOfDaysToShow,
    numberOfDaysInPreviousMonth,
    firstDayOfTheMonth,
    currentMonth: getMonthName(currentDate),
    currentYear,
    currentDate,
    today,
    selectedDate,
    onShowNextMonth,
    onShowPrevMonth,
    handleSelectDate,
    clearSelectedDate,
    weekDays,
  };
};

const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export function getMonthName(date, locale = 'en-US', format = 'long') {
  return new Intl.DateTimeFormat(locale, {
    month: format,
  }).format(date);
}
