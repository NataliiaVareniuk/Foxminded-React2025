import { useEffect } from 'react';
import clsx from 'clsx';
import style from './Toast.module.scss';

function Toast({
  message,
  duration = 6000,
  onClose,
  isOpen = true,
  className,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={clsx(style.toast, style.opening, className)}>
      <div className={style.messageWrapper}>
        <div className={style.message}>{message}</div>
      </div>
      <button type="button" className={style.closeButton} onClick={onClose}>
        
      </button>
    </div>
  );
}

export default Toast;
