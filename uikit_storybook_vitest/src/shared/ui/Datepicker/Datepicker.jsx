import style from './Datepicker.module.scss';
import { useDatepicker } from './useDatepicker.js';
import { Icon, ICON_PATHS } from '@/shared/ui/Icon';

import clsx from 'clsx';
import { useRef } from 'react';
import { useClickOutside } from '@/shared/utils/hooks/useClickOutside.js';

function Datepicker({ value, onChange, className, ...rest }) {
  const dateRef = useRef(null);

  const {
    numberOfDays,
    numberOfDaysToShow,
    numberOfDaysInPreviousMonth,
    firstDayOfTheMonth,
    currentMonth,
    currentYear,
    currentDate,
    today,
    selectedDate,
    onShowNextMonth,
    onShowPrevMonth,
    handleSelectDate,
    clearSelectedDate,
    weekDays,
  } = useDatepicker(value, onChange);

  useClickOutside(dateRef, () => {
    clearSelectedDate();
  });

  return (
    <div ref={dateRef} className={clsx(style.datePicker, className)} {...rest}>
      <div className={style.header}>
        <div className={style.currentMonth}>
          <span>{currentMonth}</span>
          <span>{currentYear}</span>
        </div>
        <div className={style.buttons}>
          <button
            type="button"
            className={style.button}
            onClick={onShowPrevMonth}
            aria-label="Previous month"
          >
            <Icon
              d={ICON_PATHS.next}
              viewBox="0 0 16 16"
              size="l"
              color="primaryIcon"
              strokeWidth="2"
              variant="stroke"
              aria-hidden="true"
              
            />
          </button>
          <button
            type="button"
            className={style.button}
            onClick={onShowNextMonth}
             aria-label="Next month"
          >
            <Icon
              d={ICON_PATHS.next}
              viewBox="0 0 16 16"
              size="l"
              color="primaryIcon"
              strokeWidth="2"
              variant="stroke"
              className={style.iconRotate}
              aria-hidden="true"
             
            />
          </button>
        </div>
      </div>

      <div className={style.body}>
        <div className={style.days}>
          {weekDays.map((day, index) => (
            <div key={index} className={style.dayOfWeek}>
              {day}
            </div>
          ))}

          {Array(numberOfDaysToShow)
            .fill('')
            .map((_, index) => {
              if (index < firstDayOfTheMonth) {
                const day =
                  numberOfDaysInPreviousMonth -
                  (firstDayOfTheMonth - 1 - index);
                return (
                  <div
                    key={index}
                    className={clsx(style.dayOfMonth, style.dayInactive)}
                  >
                    <span> {day}</span>
                  </div>
                );
              } else if (index - firstDayOfTheMonth + 1 > numberOfDays) {
                const day = index - firstDayOfTheMonth + 1 - numberOfDays;
                return (
                  <div
                    key={index}
                    className={clsx(style.dayOfMonth, style.dayInactive)}
                  >
                    {day}
                  </div>
                );
              }

              const day = index - firstDayOfTheMonth + 1;
              const calendarDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day,
              );
              const isToday =
                calendarDate.getFullYear() === today.getFullYear() &&
                calendarDate.getMonth() === today.getMonth() &&
                calendarDate.getDate() === today.getDate();

              return (
                <div key={index}>
                  <button
                    type="button"
                    className={clsx(
                      style.dayOfMonth,
                      isToday && style.dayToday,
                      selectedDate &&
                        calendarDate.getTime() === selectedDate.getTime() &&
                        style.selectedDay,
                    )}
                    onClick={() => {
                      handleSelectDate(calendarDate);
                    }}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Datepicker;
