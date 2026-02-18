import { useEffect } from 'react';
import clsx from 'clsx';
import style from './Toast.module.scss';
import { Icon, ICON_PATHS } from '@/shared/ui/Icon';

function Toast({
  message,
  duration = 3000,
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
        <Icon d={ICON_PATHS.cross} />
      </button>
    </div>
  );
}

export default Toast;
