import { useState, useEffect } from 'react';
import TimeSelect from './TimeSelect';
import { formatTime } from './time';

const timeList = formatTime(15);

export default {
  title: 'Shared/UI/TimeSelect',
  component: TimeSelect,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    value: {
      control: 'select',
      options: timeList,
    },
    onChange: { action: 'changed' },
    font: {
      control: { type: 'select' },
      options: ['Inter', 'Roboto', 'Arial', 'Courier New'],
    },

    '--text-default': { control: 'color' },
    '--border-radius': { control: 'text' },
    '--border-secondary': { control: 'color' },
    '--main-background': { control: 'color' },
    '--shadow-content': { control: 'text' },
    '--font-size': { control: 'text' },
    '--hovered': { control: 'color' },
    '--selected': { control: 'color' },
  },
};

export const Playground = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    const vars = [
      '--text-default',
      '--border-radius',
      '--border-secondary',
      '--main-background',
      '--shadow-content',
      '--font-size',
      '--hovered',
      '--selected',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (v) => {
      setValue(v);
      args.onChange?.(v);
    };

    return (
      <div style={{ fontFamily: args.font }}>
        <TimeSelect value={value} onChange={handleChange} />
      </div>
    );
  },

  args: {
    value: '12:30 pm',
    font: 'Inter',
    '--text-default': '#323749',
    '--border-radius': '8px',
    '--border-secondary': '#dee0e5',
    '--main-background': '#ffffff',
    '--shadow-content': '0 8px 16px 0 rgba(49, 49, 49, 0.1)',
    '--font-size': '15px',
    '--hovered': '#f6f6f6',
    '--selected': '#e3e3e3',
  },
};

export const Default = {
  args: { value: '12:30 pm', font: 'Inter' },
};
