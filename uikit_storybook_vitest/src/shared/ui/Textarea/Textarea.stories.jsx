import { useState, useEffect } from 'react';
import Textarea from './Textarea';

export default {
  title: 'Shared/UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },

    '--text-default': { control: 'color' },
    '--font-size-title': { control: 'text' },
    '--font-size-main': { control: 'text' },
    '--text-color': { control: 'color' },
    '--underline': { control: 'color' },
    '--disabled': { control: 'color' },

    onChange: { action: 'changed' },
  },
};

export const Playground = {
  render: (args) => {
    const vars = [
      '--text-default',
      '--font-size-title',
      '--font-size-main',
      '--text-color',
      '--underline',
      '--disabled',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    const [value, setValue] = useState(args.value ?? '');
    useEffect(() => {
      setValue(args.value ?? '');
    }, [args.value]);

    const handleChange = (e) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return (
      <div>
        <Textarea {...args} value={value} onChange={handleChange} />
      </div>
    );
  },

  args: {
    label: 'Description',
    placeholder: 'Type text...',
    disabled: false,
    value: '',

    '--text-default': '#323749',
    '--font-size-title': '10px',
    '--font-size-main': '15px',
    '--text-color': '#000000',
    '--underline': '#737373',
    '--disabled': '#a1a1a1',
  },
};

export const Disabled = {
  render: (args) => <Textarea {...args} />,
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'This textarea is disabled',
  },
};
