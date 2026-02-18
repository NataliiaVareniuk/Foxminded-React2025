import Checkbox from './Checkbox';

export default {
  title: 'Shared/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox component with controlled `checked` state and `onChange` handler. Use it with a label as children.',
      },
    },
  },
  args: {
    children: 'Label',
    checked: false,
  },
  argTypes: {
    children: { control: 'text' },
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },

    '--primary-color': { control: 'color' },
    '--white-text': { control: 'color' },
    '--font-size': { control: 'text' },
    '--text-default': { control: 'color' },
    '--transition-speed': { control: 'text' },
    '--text': { control: 'color' },
  },
};

export const Playground = {
  render: (args, { updateArgs }) => {
    const vars = [
      '--primary-color',
      '--white-text',
      '--font-size',
      '--text-default',
      '--border-radius',
      '--transition-speed',
      '--text',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    return (
      <Checkbox
        {...args}
        checked={args.checked}
        onChange={(v) => updateArgs({ checked: v })}
      >
        {args.children}
      </Checkbox>
    );
  },
  args: {
    children: 'Click me',
    checked: false,

    '--primary-color': '#00ae1c',
    '--white-text': '#ffffff',
    '--text-default': '#323749',
    '--border-radius': '2px',
    '--transition-speed': '0.3s',
    '--text': '#000',
    '--font-size': '12px',
  },
};

export const Checked = { args: { checked: true, children: 'Checked' } };

export const Unchecked = { args: { checked: false, children: 'Unchecked' } };
