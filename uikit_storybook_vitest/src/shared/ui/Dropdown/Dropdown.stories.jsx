import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';

export default {
  title: 'Shared/UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    value: {
      control: 'select',
      options: ['Day', 'Week', null],
    },
    onChange: { action: 'change' },
    font: {
      control: { type: 'select' },
      options: ['Inter', 'Roboto', 'Arial', 'Courier New'],
    },

    '--secondary-color': { control: 'color' },
    '--initial-background': { control: 'color' },
    '--border-radius': { control: 'text' },
    '--shadow-button': { control: 'text' },
    '--hover-color': { control: 'color' },
    '--secondary-shadow': { control: 'text' },

    '--pressed-color': { control: 'color' },

    '--border-secondary': { control: 'color' },
    '--main-background': { control: 'color' },
    '--shadow-content': { control: 'text' },

    '--text-default': { control: 'color' },
    '--transition-speed': { control: 'text' },
    '--font-size': { control: 'text' },
    '--hovered': { control: 'color' },
    '--selected': { control: 'color' },
  },
};

export const Playground = {
  render: (args) => {
    const vars = [
      '--secondary-color',
      '--border-radius',
      '--shadow-button',
      '--hover-color',
      '--secondary-shadow',
      '--pressed-color',
      '--border-secondary',
      '--main-background',
      '--shadow-content',
      '--text-default',
      '--transition-speed',
      '--hovered',
      '--selected',
      '--font-size',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    const [value, setValue] = useState(args.value ?? null);
    useEffect(() => {
      setValue(args.value ?? null);
    }, [args.value]);

    const handleSetSelected = (val) => {
      setValue(val);
      args.onChange?.(val);
    };
    return (
      <div style={{ fontFamily: args.font }}>
        <Dropdown value={value} onChange={handleSetSelected} />
      </div>
    );
  },

  args: {
    value: null,
    font: 'Roboto',
    '--secondary-color': '#dedfe5',
    '--border-radius': '8px',
    '--shadow-button': ' 0 1px 2px 0 rgba(16, 24, 40, 0.05)',
    '--hover-color': '#efefef',
    '--secondary-shadow': '0 1px 2px 0 rgba(69, 69, 69, 0.25)',
    '--pressed-color': '#e0e0e0',
    '--border-secondary': '#dee0e5',
    '--main-background': '#ffffff',
    '--shadow-content': '0 8px 16px 0 rgba(49, 49, 49, 0.1)',
    '--text-default': '#323749',
    '--transition-speed': '0.3s',
    '--hovered': '#f6f6f6',
    '--selected': '#e3e3e3',
    '--font-size': '15px',
  },
};

export const Default = {
  args: { value: null, font: 'Roboto' },
};

export const WithDaySelected = {
  args: { value: 'Day', font: 'Roboto' },
};

export const WithWeekSelected = {
  args: { value: 'Week', font: 'Roboto' },
};
