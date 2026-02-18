import style from './Checkbox.module.scss';
import checkedIcon from '@/shared/assets/images/icons/checked.svg';
import clsx from 'clsx';

function Checkbox({ checked = false, onChange, children, className, ...rest }) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.checked);
  };

  return (
    <label className={clsx(style.checkboxLabel, className)}>
      <input
        type="checkbox"
        className={style.checkboxInput}
        onChange={handleChange}
        checked={checked}
        {...rest}
      />
      <span className={style.checkBox}>
        {checked && <img src={checkedIcon} alt="" aria-hidden="true" />}
      </span>
      {children && <span className={style.labelText}>{children}</span>}
    </label>
  );
}

export default Checkbox;
