import css from "./Input.module.scss";
import { useMemo, useState, useCallback } from "react";
import classNames from "classnames";

function fieldValidation(value, name, comparing) {
  let isValid = false;
  let error = "";

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const specialSymbol = /[#.?!@$%^&*-]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const alphabetsNumber = /^[a-zA-Z0-9]+$/;
   const useValue = value.trim();
  switch (name) {
    case "password":
      if (useValue.length < 8) {
        error = "Must contain at least 8 symbols";
      } else if (!numbers.test(useValue)) {
        error = "Must contain at least 1 number";
      } else if (!specialSymbol.test(useValue)) {
        error = "Must contain at least 1 special symbol";
      } else if (!upperCaseLetters.test(useValue)) {
        error = "Must contain at least 1 upper case symbol";
      }

      break;
    case "username":
      if ( value.length < 3) {
        error = "Must contain at least 3 symbols";
      } else if (!alphabetsNumber.test(useValue)) {
        error = "Alphabets and number only";
      }
      break;

    case "email":
      if (
         useValue.length < 3 ||
        !emailPattern.test(String(useValue).toLowerCase())
      ) {
        error = "Please enter a valid email address";
      }
      break;

    case "confirm":
      if ( useValue.length < 8) {
        error = "Must contain at least 8 symbols";
      } else if (useValue !== comparing) {
        error = "Passwords are not the same";
      }
      break;
    default:
      break;
  }

  isValid = error === "" ;

  return { error, isValid };
}

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
