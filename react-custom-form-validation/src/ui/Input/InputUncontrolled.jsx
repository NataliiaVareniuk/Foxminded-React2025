import css from "./Input.module.scss";
import { useMemo, useState, useCallback } from "react";
import classNames from "classnames";

function InputUncontrolled({
  label_text,
  placeholder,
  name,
  type,
  ref,
  comparing,
  onBlurValid
}) {
  const [isDisplay, setIsDisplay] = useState(false);

  const [activeUser, setActiveUser] = useState({
    username: false,
    email: false,
    password: false,
    confirm: false,
  });

  const toggleDisplay = useCallback(() => {
    setIsDisplay((prev) => !prev);
  }, []);

  const handleFocus = (field) => {
    setActiveUser((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field, ref) => {
    validationOnBlur(field, ref);
    setActiveUser((prev) => ({
      ...prev,
      [field]: false,
    }));
  
  };

   const [fieldValid, setFieldValid] = useState({
    name: {error: "", isValid: true },
   });

 const validationOnBlur = (field, ref) => {
  const value = ref.current?.value || "";
  
  const { error, isValid } = fieldValid(value, field, comparing?.current.value);

 setFieldValid((prev) => ({
    ...prev,
    [name]: { error, isValid },
  }));
   onBlurValid({isValid});
   
 }
   
const buttonViewClass = classNames({
    [css.password]: type === "password" && !isDisplay,
    [css.passwordOpen]: type === "password" && isDisplay,
});

  const inputType = useMemo(
    () => (type === "password" && isDisplay ? "text" : type),
    [type, isDisplay]
  );

  const Divider = ({ active, name }) => {
    const field = fieldValid[name];

  const isValid = field?.isValid ?? true;
  const hasError = field?.error ?? "";
  return(
    <div
      className={classNames({
        [css.divider]: true,
        [css.dividerActive]: active || isValid ,
        [css.dividerError]: !active && !isValid && hasError,
      })}
    />
     ) 
  };
  
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor={name}>
        {label_text}*
      </label>
      <div className={css.passwordContainer}>
        <input
          name={name}
          type={inputType}
          className={css.inputClass}
          placeholder={placeholder}
          ref={ref}
          autoComplete="off"
          onFocus={() => handleFocus(name)}
          onBlur={() => handleBlur(name, ref)}
         
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleDisplay}
            className={buttonViewClass}
          />
        )}
      </div>

      <Divider active={activeUser[name]} name={name} />
       <div className={css.errorPlace} >
        {!fieldValid[name]?.isValid && <span className={css.error}> {fieldValid[name]?.error}</span>}
       </div>
    </div>
  );
}

export default InputUncontrolled;
