import clsx from 'clsx';
import style from './Icon.module.scss';

function Icon({
  d,
  viewBox = '0 0 16 16',
  size = 'l',
  color = 'primaryIcon',
  className,
  strokeWidth = '',
  variant = '',
  ...props
}) {
  const classSvg = clsx(
    style.icon,
    style[`size_${size}`],
    style[`color_${color}`],
    className,
  );

  return (
    <svg
      className={classSvg}
      focusable="false"
      width="100%"
      height="100%"
      viewBox={viewBox}
      aria-hidden="true"
      fill="none"
      {...props}
    >
      {variant === 'stroke' ? (
        <path
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />
      ) : (
        <path d={d} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      )}
    </svg>
  );
}
export default Icon;
