import { useState } from 'react';
import ColorPicker from './ColorPicker';
import { COLORS } from './colors';
import style from './ColorPicker.module.scss';

function ColorPalette() {
  const [colors, setColors] = useState(COLORS);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleColorChange = (index, newColor) => {
    setColors((prev) => prev.map((c, i) => (i === index ? newColor : c)));
    setSelectedIndex(index);
  };

  return (
    <div className={style.colorPalette}>
      <h2 className={style.colorPickerHeader}> Color</h2>
      <div className={style.colorPickerContainer}>
        {colors.map((color, index) => (
          <ColorPicker
            key={index}
            value={color}
            selected={selectedIndex === index}
            onSelect={() => setSelectedIndex(index)}
            onChange={(newColor) => handleColorChange(index, newColor)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPalette;
