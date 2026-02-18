import css from "./Checkbox.module.scss";
import { useCallback } from "react";

function Checkbox({ isAgreeMain, onChange }) {
    const onChangeCheckbox = useCallback(
    (e) => {
      const checked = e.target.checked;
      
      if (onChange) {
        onChange(checked);
      }
    },
    [onChange]
  );

  return (
    <div className={css.checkbox}>
      <label className={css.checkboxLabel}>
        <input
          type="checkbox"
          checked={isAgreeMain} 
          onChange={onChangeCheckbox}
          className={css.checkboxInput}
        />
        I agree to the terms and conditions
      </label>
    </div>
  );
}

export default Checkbox;
