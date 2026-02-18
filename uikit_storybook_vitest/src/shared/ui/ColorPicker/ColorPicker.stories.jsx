import React, { useState } from 'react';
import ColorPicker from './ColorPicker';

export default {
  title: 'Shared/UI/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Color picker.',
      },
    },
  },

  args: {
    value: '#9f2957',
    selected: false,
  },

  argTypes: {
    value: { control: 'color' },
    selected: { control: 'boolean' },
    onSelect: { action: 'selected' },
    onChange: { action: 'changed' },

    '--picker-size': { control: 'text' },
    '--picker-outline-width': { control: 'text' },
    '--picker-color': { control: 'color' },
    '--secondary-color': { control: 'color' },
    '--text-default': { control: 'color' },
    '--border-radius': { control: 'text' },
    '--border-radius-small': { control: 'text' },
    '--transition-speed': { control: 'text' },
  },
};

export const Playground = {
  render: (args, { updateArgs }) => {
    const [value, setValue] = useState(args.value);

    const vars = [
      '--picker-size',
      '--picker-outline-width',
      '--secondary-color',
      '--text-default',
      '--border-radius-small',
      '--border-radius',
      '--transition-speed',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    return (
      <ColorPicker
        value={value}
        selected={args.selected}
        onSelect={() => updateArgs({ selected: !args.selected })}
        onChange={(newColor) => {
          setValue(newColor);
          args.onChange?.(newColor);
        }}
      />
    );
  },
  args: {
    value: '#9f2957',
    selected: false,
    '--picker-outline-width': '1px',
    '--picker-size': '12px',
    '--picker-color': '#9f2957',
    '--secondary-color': '#dedfe5',
    '--text-default': '#323749',
    '--border-radius': '8px',
    '--border-radius-small': '4px',
    '--transition-speed': '0.2s',
  },
};

export const Default = { args: { value: '#9f2957', selected: false } };
export const Selected = { args: { value: '#9f2957', selected: true } };
export const CustomColor = { args: { value: '#8332A4', selected: false } };
