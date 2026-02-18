import css from './Button.module.scss';
import className from "classnames";
import { memo } from "react";

const Button = memo(({data}) => {
   const {isAgree, isValidForm} = data;

 const buttonSubmit = className({
  [css.buttonClass]: true,
  [css.validForm]: isValidForm && isAgree,
  [css.notValidForm]: !isValidForm || !isAgree,
 })
  return (
   <button    className={buttonSubmit} type='submit'>
     Register
    </button>
  );

})

export default Button;
