import style from './Modal.module.scss';
import clsx from 'clsx';

import { Icon, ICON_PATHS } from '@/shared/ui/Icon';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

function Modal({
  size = 's',
  title,
  onClose,
  className,
  children,
  isOpen = true,
  ...rest
}) {
  const allowedSizes = ['xs', 's', 'm', 'l', 'xl'];
  const safeSize = allowedSizes.includes(size) ? size : 's';

  if (!isOpen) {
    return null;
  }
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  const modalClass = clsx(style.modal, style[`size_${safeSize}`], className);
  const modal = (
    <div className={clsx(style.modalBackdrop)} onClick={onClose} {...rest}>
      <div
        data-id="modal"
        ref={modalRef}
        className={modalClass}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
      >
        <div id="modal-title" className={style.header}>
          <div className={style.title}>{title}</div>
          <button
            type="button"
            className={style.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon d={ICON_PATHS.cross} />
          </button>
        </div>

        <div className={style.separator}></div>
        <div className={style.modalContent}>{children}</div>
      </div>
    </div>
  );
  const container = document.getElementById('modal');
  if (!container) return null;
  return createPortal(modal, container);
}
export default Modal;
