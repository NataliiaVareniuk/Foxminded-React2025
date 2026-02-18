import css from "./Input.module.scss";
import { useMemo, useState, useCallback, useEffect } from "react";
import classNames from "classnames";
import { useInput } from "../../utils/useInput";

function Input({
  isClear,
  label_text,
  placeholder,
  name,
  type,
  onChange,
  comparing,
}) {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const inputValue = useInput("", name, onChange, comparing, isClear);

  const toggleDisplay = useCallback(() => {
    setIsDisplay((prev) => !prev);
  }, []);

  const toggleActive = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const buttonViewClass = classNames({
    [css.password]: type === "password" && !isDisplay,
    [css.passwordOpen]: type === "password" && isDisplay,
  });

  const inputType = useMemo(
    () => (type === "password" && isDisplay ? "text" : type),
    [type, isDisplay]
  );

  const dividerClass = classNames({
    [css.divider]: true,
    [css.dividerActive]: isActive && inputValue.isError === "",
    [css.dividerError]: inputValue.isError !== "",
  });

  useEffect(() => {
    if (isClear) {
      setIsActive(false);
      setIsDisplay(false);
    }
  }, [isClear]);

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={name}>
        {label_text}*
      </label>
      <div className={css.passwordContainer}>
        <input
          name={name}
          id={name}
          type={inputType}
          value={inputValue.value}
          className={css.inputClass}
          placeholder={placeholder}
          onChange={inputValue.handleChange}
          onBlur={(e) => {
            inputValue.handleBlur(e);
            toggleActive();
          }}
          autoComplete="off"
          onFocus={toggleActive}
        />
        <button
          type="button"
          onClick={toggleDisplay}
          className={buttonViewClass}
        />
      </div>
      <div className={dividerClass} />
      <div className={css.errorPlace}>
        {inputValue.isError !== "" && inputValue.isVisited && (
          <span className={css.error}> {inputValue.isError}</span>
        )}
      </div>
    </div>
  );
}

export default Input;
