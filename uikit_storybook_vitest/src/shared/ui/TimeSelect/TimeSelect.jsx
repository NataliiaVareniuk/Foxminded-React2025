import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import style from './TimeSelect.module.scss';
import { formatTime } from './time';
import { useClickOutside } from '@/shared/utils/hooks/useClickOutside.js';

function TimeSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeSelectRef = useRef(null);
  const selectedRef = useRef(null);

  const toggleTimeSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const times = formatTime(15);
  useClickOutside(timeSelectRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: 'center' });
    }
  }, [isOpen]);

  return (
    <div ref={timeSelectRef} className={style.timeSelect}>
      <div className={style.header}>
        <span className={style.title}>Time</span>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={toggleTimeSelect}
          className={style.buttonTimeSelect}
        >
          {value ?? '12:30 pm'}
        </button>
      </div>
      {isOpen && (
        <div className={style.timeContent}>
          {times.map((time) => (
            <button
              key={time}
              type="button"
              ref={value === time ? selectedRef : null}
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
              className={clsx(style.timeItem, value === time && style.selected)}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TimeSelect;
