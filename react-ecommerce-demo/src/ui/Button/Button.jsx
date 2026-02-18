import style from "./Button.module.scss";
import classNames from "classnames";

function Button({ children, onClick, iconSrc, iconSize, disabled, wClass }) {
  const iconSizeClass = classNames({
    [style.icon]: true,
    [style.iconSmall]: iconSize === "small",
  })
  const buttonClass = classNames(style.button, wClass);
  
  return (
    <button onClick={onClick} disabled={disabled} className={buttonClass} >
       {iconSrc && <img src={iconSrc} alt="icon" className={iconSizeClass} />} 
      {children}
    </button>
  );
}

export default Button;
