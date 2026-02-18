import style from './Input.module.scss';
import { useCallback, useState } from 'react';
import eye from '@/shared/assets/images/icons/eye.svg';
import eyeOff from '@/shared/assets/images/icons/eye-off.svg';
import classNames from 'classnames';

const Input = ({ label, error, size = 'l', disabled, name, type, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const allowedSizes = ['xs', 's', 'm', 'l', 'xl'];
  const safeSize = allowedSizes.includes(size) ? size : 's';

  let inputType = type;
  if (type === 'password' && visible) {
    inputType = 'text';
  }
  const inputClass = classNames(
    style.input,
    error && style.inputError,
    style[`size_${safeSize}`],
  );
  const labelClass = classNames(style.label, disabled && style.disabled);

  return (
    <div className={style.inputContainer}>
      <div className={style.inputContent}>
        <label className={labelClass} htmlFor={name}>
          {label}
        </label>
        <div className={error ? style.inputWrapperError : style.inputWrapper}>
          <input
            name={name}
            id={name}
            type={inputType}
            disabled={disabled}
            className={inputClass}
            autoComplete="off"
            {...rest}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={toggleVisible}
              className={style.buttonClass}
              disabled={disabled}
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              {<img src={visible ? eye : eyeOff} />}
            </button>
          )}
        </div>
      </div>

      <div
        aria-live="assertive"
        className={error ? style.errorVisible : style.error}
      >
        {error}
      </div>
    </div>
  );
};

export default Input;
