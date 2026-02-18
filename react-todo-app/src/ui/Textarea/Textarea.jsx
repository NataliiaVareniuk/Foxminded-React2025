import clsx from 'clsx';
import style from './Textarea.module.scss';
import React, { useEffect, forwardRef } from 'react';


const MAX_ROWS = 4;

const Textarea = forwardRef(function Textarea({
 
  label,
  value,
  onChange,
  placeholder = 'Text',
  disabled = false,
  isEdit =false,
  classProps,
  id,
  ...rest
}, ref ) {
  

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
    <>
       <textarea
        id={id}
        name="textArea"
        ref={ref}
        rows="1"
        cols="60"
        className={clsx(style.text, classProps, isEdit && style.isEdit)}
        onChange={onChange}
        readOnly={disabled}
         value={value}
        {...rest}
      />
      
    </>
  );
})

export default Textarea;
