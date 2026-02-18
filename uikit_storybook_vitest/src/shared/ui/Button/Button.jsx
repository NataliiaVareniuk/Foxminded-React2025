import style from './Button.module.scss';

import classNames from 'classnames';

function Button({
  children,
  onClick,
  iconSrc,
  size = 'm',
  variant = 'primary',
  disabled = false,
  className,
  ...rest
}) {
  const allowedSizes = ['xs', 's', 'm', 'l', 'xl'];
  let safeSize = 'm';

  if (allowedSizes.includes(size)) {
    safeSize = size;
  }

  const buttonClass = classNames(
    style.button,
    style[`size_${safeSize}`],
    className,
    {
      [style.primary]: variant === 'primary',
      [style.secondary]: variant === 'secondary',
    },
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...rest}
    >
      {iconSrc && <img src={iconSrc} className={style.icon} />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
