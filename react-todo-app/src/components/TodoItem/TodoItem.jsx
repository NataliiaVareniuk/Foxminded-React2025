import { useState, useRef, useEffect } from 'react';
import style from './TodoItem.module.scss';
import clsx from 'clsx';
import Checkbox from '@/ui/Checkbox/Checkbox';
import Textarea from '@/ui/Textarea/Textarea';
import deleteIcon from '@/shared/images/icons/delete.svg';
import editIcon from '@/shared/images/icons/edit.svg';
import saveIcon from '@/shared/images/icons/done.svg';

function TodoItem({ value, id, checked, onToggle, onSave, onDelete }) {
  const [newEditValue, setNewEditedValue] = useState(value);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValue, setInitialValue] = useState('');
  const itemRef = useRef(null);

  const refTextArea = useRef(null);

  const handleEdit = () => {
    setInitialValue(value);
    setNewEditedValue(value);
    setIsEdit(true);
  };

  const handleSave = () => {
    if (!newEditValue.trim()) return;
    onSave(id, newEditValue);
    setIsEdit(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isEdit && itemRef.current && !itemRef.current.contains(e.target)) {
        setNewEditedValue(initialValue);
        setIsEdit(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEdit, initialValue]);

  useEffect(() => {
    if (isEdit && refTextArea.current) {
      const el = refTextArea.current;
      el.focus();
      const length = el.value.length;
      el.setSelectionRange(length, length);
    }
  }, [isEdit]);

  return (
    <div
      ref={itemRef}
      className={clsx(
        style.itemToDo,
        'container-default',
        checked && style.bgChecked,
      )}
    >
      <Checkbox
        checked={checked}
        onChange={() => onToggle(id)}
        id={id}
        isEdit={isEdit}
      />
      <span className={style.divide}></span>

      <Textarea
        id={id}
        ref={refTextArea}
        readOnly={checked}
        isEdit={isEdit}
        onChange={(e) => setNewEditedValue(e.target.value)}
        value={newEditValue}
        classProps="text-default"
      />

      {!checked && !isEdit && (
        <>
          <button onClick={() => handleEdit()} className={style.button}>
            {editIcon && <img src={editIcon} />}
          </button>
        </>
      )}
      {!isEdit && (
        <>
          <button
            onClick={() => onDelete(id)}
            className={clsx(style.button, style.deleteButton)}
          >
            {deleteIcon && <img src={deleteIcon} />}
          </button>
        </>
      )}

      {!checked && isEdit && (
        <button
          onClick={handleSave}
          className={clsx(style.button, style.saveButton)}
        >
          {saveIcon && <img src={saveIcon} />}
        </button>
      )}
    </div>
  );
}

export default TodoItem;
