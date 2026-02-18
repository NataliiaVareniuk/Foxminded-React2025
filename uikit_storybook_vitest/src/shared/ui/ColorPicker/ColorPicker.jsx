import style from './ColorPicker.module.scss';
import clsx from 'clsx';

function ColorPicker({ value, selected, onSelect, onChange }) {
  return (
    <div
      className={clsx(style.fakeInput, selected && style.selected)}
      style={{ backgroundColor: value }}
    >
      <input
        className={style.input}
        type="color"
        value={value}
        aria-label="Pick color"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

export default ColorPicker;
