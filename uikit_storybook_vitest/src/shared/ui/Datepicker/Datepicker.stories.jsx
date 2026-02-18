import { useState, useEffect } from 'react';
import Datepicker from './Datepicker';

export default {
  title: 'Shared/UI/Datepicker',
  component: Datepicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    value: { control: 'date' },
    onChange: { action: 'changed' },
    font: {
      control: { type: 'select' },
      options: ['Inter', 'Roboto', 'Arial', 'Courier New'], 
    },
    '--primary-color': { control: 'color' },
    '--secondary-color': { control: 'color' },
    '--text-default': { control: 'color' },
    '--white-text': { control: 'color' },
    '--font-size': { control: 'text' },
    '--shadow-hover': { control: 'object' },
    '--main-background': { control: 'color' },
    '--border-radius-small': { control: 'text' },
    '--border-radius': { control: 'text' },
    '--transition-speed': { control: 'text' },
  },
};

export const Playground = {
  render: (args) => {
    const vars = [
      '--primary-color',
      '--secondary-color',
      '--text-default',
      '--white-text',
      '--main-background',
      '--shadow-hover',
      '--border-radius-small',
      '--border-radius',
      '--transition-speed',
      '--font-size',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });
    const [value, setValue] = useState(args.value);

    const handleChange = (date) => {
      setValue(date);
      args.onChange?.(date);
    };
    useEffect(() => {
      setValue(args.value ?? null);
    }, [args.value]);

    return(
      <div style={{ fontFamily: args.font }}>
       <Datepicker {...args} value={value} onChange={handleChange} />
      </div>
       
    );
  },

  args: {
    value: null,
    font: 'Inter',
    '--primary-color': '#00ae1c',
    '--secondary-color': '#dedfe5',
    '--text-default': '#323749',
    '--white-text': '#ffffff',
    '--font-size':'12px',
    '--main-background': ' #ffffff',
    '--shadow-hover': '0 4px 4px 0 rgba(0, 0, 0, 0.1)',
    '--border-radius-small': '4px',
    '--border-radius': '8px',
    '--transition-speed': '0.3s',
  },
};

export const WithTodaySelected = {
  render: (args) =>(
    <div style={{ fontFamily: args.font }}>
      <Datepicker {...args} />,
    </div>
  ),
  args: {
    value: new Date(),
    font: 'Inter',
  },
};

export const WithCustomDate = {
  render: (args) =>(
    <div style={{ fontFamily: args.font }}>
  <Datepicker {...args} />
    </div>
  ),
  args: {
    value: new Date(2026, 0, 15),
    font: 'Inter',
  },
};
