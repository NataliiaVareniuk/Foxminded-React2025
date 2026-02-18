import { useState } from 'react';
import Input from './Input';

export default {
  title: 'Shared/UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'inline-radio',
      options: ['text', 'password', 'email', 'number', 'search'],
    },
    size: { control: 'select', options: ['xs', 's', 'm', 'l', 'xl'] },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    font: {
      control: { type: 'select' },
      options: ['Inter', 'Roboto', 'Arial', 'Courier New'],
    },

    '--text-default': { control: 'color' },
    '--underline-default': { control: 'color' },
    '--red-error': { control: 'color' },
    '--transition-speed': { control: 'text' },
    '--input-width': { control: 'text' },
    '--font-size-first': { control: 'text' },
    '--font-size-second': { control: 'text' },

    onChange: { action: 'changed' },
  },
};

export const Playground = {
  render: (args) => {
    const vars = [
      '--text-default',
      '--underline-default',
      '--red-error',
      '--transition-speed',
      '--input-width',
      '--font-size-first',
      '--font-size-second',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    const [value, setValue] = useState(args.value ?? '');

    const handleChange = (e) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <div style={{ fontFamily: args.font }}>
        <Input {...args} value={value} onChange={handleChange} />
      </div>
    );
  },

  args: {
    label: 'Label',
    name: 'input',
    value: '',
    placeholder: 'Type something',
    type: 'text',
    size: 'l',
    disabled: false,
    error: '',
    font: 'Inter',

    '--text-default': '#323749',
    '--underline-default': '#737373',

    '--input-width': '300px',
    '--font-size-first': '10px',
    '--font-size-second': '15px',

    '--red-error': '#ff5620',
    '--transition-speed': '0.3s',
  },
};

export const Text = {
  render: (args) => (
    <div style={{ fontFamily: args.font }}>
      <Input {...args} />
    </div>
  ),
  args: {
    type: 'text',
    label: 'Text',
    font: 'Inter',
    placeholder: 'Enter text',
  },
};

export const Password = {
  render: (args) => (
    <div style={{ fontFamily: args.font }}>
      <Input {...args} />
    </div>
  ),
  args: {
    type: 'password',
    label: 'Password',
    font: 'Inter',
    placeholder: 'Password',
  },
};

export const WithError = {
  render: (args) => (
    <div style={{ fontFamily: args.font }}>
      <Input {...args} />
    </div>
  ),
  args: {
    error: 'This field is required',
    label: 'With Error',
    name: 'with-error',
    font: 'Inter',
  },
};

export const Disabled = {
  render: (args) => (
    <div style={{ fontFamily: args.font }}>
      <Input {...args} />
    </div>
  ),
  args: {
    disabled: true,
    label: 'Disabled',
    font: 'Inter',
    placeholder: 'Disabled input',
  },
};
