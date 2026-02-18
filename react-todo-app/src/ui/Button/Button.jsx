import { clsx } from 'clsx';
import style from './Button.module.scss';

function Button({
  children,
  onClick,
  iconSrc,
  size = 'compact',
  variant = 'primary',
  disabled = false,
  className,
  ...rest
}) {
  const allowedSizes = ['icon', 'compact', 'wide', 'full'];
  let safeSize = 'compact';

  if (allowedSizes.includes(size)) {
    safeSize = size;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        style.button,
        style[`size_${safeSize}`],
        variant === 'primary' && style.primary,
        variant === 'secondary' && style.secondary,
      )}
      {...rest}
    >
      {iconSrc && <img src={iconSrc} className={style.icon} />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
