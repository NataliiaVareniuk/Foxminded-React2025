import clsx from 'clsx';
import style from './Textarea.module.scss';
import React, { useEffect, useRef } from 'react';

const MAX_ROWS = 4;

function Textarea({
  label,
  value,
  onChange,
  placeholder = 'Text',
  disabled = false,
  className,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const compStyle = window.getComputedStyle(elem);
    const lineHeight = parseFloat(compStyle.lineHeight);

    const maxHeight = lineHeight * MAX_ROWS;

    elem.style.height = 'auto';
    elem.style.height = `${Math.min(elem.scrollHeight, maxHeight)}px`;
  }, [value]);

  return (
    <div
      className={clsx(style.textArea, className, {
        [style.disabled]: disabled,
      })}
      {...rest}
    >
      <label htmlFor="textArea" className={style.header}>
        {label}
      </label>

      <textarea
        id="textArea"
        name="textArea"
        ref={ref}
        rows="1"
        cols="60"
        className={style.text}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
      />
      <div className={style.separator}></div>
    </div>
  );
}

export default Textarea;
