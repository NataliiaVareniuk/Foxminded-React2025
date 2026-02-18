import style from './Checkbox.module.scss';
import checkedIcon from '../../shared/images/icons/checked.svg';
import clsx from 'clsx';

function Checkbox({ checked = false, onChange, id, isEdit, ...rest}) {
  const handleChange = (e) => {
    if (onChange && id) onChange(e.target.checked);
  };

  return (
    <>
     <input
        type="checkbox"
        className={style.checkboxInput}
        onChange={handleChange}
        checked={checked}
        id={id}
        {...rest}
      />
      <label htmlFor={id} className={clsx(style.checkBox, isEdit && style.isEdit)}> 
        {checked && <img src={checkedIcon} alt="" />}
      </label>
    </>
     
      
   
  );
}

export default Checkbox;
