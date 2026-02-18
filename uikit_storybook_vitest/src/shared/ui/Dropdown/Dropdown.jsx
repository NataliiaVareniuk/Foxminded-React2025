import { useState, useRef } from 'react';
import { useClickOutside } from '@/shared/utils/hooks/useClickOutside';
import style from './Dropdown.module.scss';
import { Icon, ICON_PATHS } from '@/shared/ui/Icon';
import clsx from 'clsx';
const OPTIONS = ['Day', 'Week'];

function Dropdown({ value, onChange, className, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      ref={dropdownRef}
      className={clsx(style.dropdown, className)}
      {...rest}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className={clsx(style.dropdownButton, isOpen && style.active)}
      >
        {value ?? 'Select'}
        <span>
          <Icon d={ICON_PATHS.down} viewBox="-6 -6 16 16" size="l" />
        </span>
      </button>

      {isOpen && (
        <div className={style.dropdownContent}>
          {OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={clsx(
                style.dropdownItem,
                value === option && style.selected,
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
