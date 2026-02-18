import Button from './Button';

export default {
  title: 'Shared/UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    children: { control: 'text', name: 'label' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'm', 'l', 'xl'],
    },
    disabled: { control: 'boolean' },

    '--primary-color': { control: 'color' },
    '--white-text': { control: 'color' },
    '--border-primary': { control: 'color' },
    '--hover-shadow': { control: 'text' },
    '--pressed-primary': { control: 'color' },
    '--disabled-text': { control: 'color' },
    '--disabled-primary': { control: 'color' },

    '--secondary-color': { control: 'color' },
    '--text-default': { control: 'color' },
    '--hover-secondary': { control: 'color' },
    '--secondary-shadow': { control: 'text' },
    '--pressed-secondary': { control: 'color' },
    '--underline-default': { control: 'color' },
    '--border-secondary': { control: 'color' },
    '--disabled-secondary': { control: 'color' },
    '--shadow': { control: 'text' },
    '--btn-width': { control: 'text' },
    '--border-radius': { control: 'text' },
    '--transition-speed': { control: 'text' },

    iconSrc: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export const Playground = {
  render: (args) => {
    const vars = [
      '--primary-color',
      '--white-text',
      '--border-primary',
      '--hover-shadow',
      '--pressed-primary',
      '--disabled-text',
      '--disabled-primary',
      '--secondary-color',
      '--text-default',
      '--hover-secondary',
      '--secondary-shadow',
      '--pressed-secondary',
      '--underline-default',
      '--border-secondary',
      '--disabled-secondary',
      '--shadow',
      '--btn-width',
      '--border-radius',
      '--transition-speed',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    return <Button {...args}>{args.children}</Button>;
  },

  args: {
    children: 'Button',
    size: 'm',
    variant: 'primary',
    disabled: false,

    '--primary-color': '#00ae1c',
    '--white-text': '#ffffff',
    '--border-primary': '#5ce171',
    '--hover-shadow': '0 2px 2px 0 rgba(92, 225, 113, 0.25)',
    '--pressed-primary': '#0cd52b',
    '--disabled-text': '#b9b9b9',
    '--disabled-primary': '#187727',
    '--secondary-color': '#dedfe5',
    '--text-default': '#323749',
    '--hover-secondary': '#efefef',
    '--secondary-shadow': '0 1px 2px 0 rgba(69, 69, 69, 0.25)',
    '--pressed-secondary': '#e0e0e0',
    '--underline-default': '#737373',
    '--border-secondary': '#8d8e91',
    '--disabled-secondary': '#c8c8c8',
    '--shadow': '0 1px 2px 0 rgba(69, 69, 69, 0.25)',
    '--btn-width': '63px',
    '--border-radius': '8px',
    '--transition-speed': '0.3s',
  },
};

export const Primary = {
  args: { variant: 'primary', children: 'Primary Button' },
};
export const Secondary = {
  args: { variant: 'secondary', children: 'Secondary Button' },
};

export const WithPrimaryIcon = {
  args: {
    iconSrc: '/src/shared/assets/images/icons/play-primary.svg',
    children: 'Play Primary',
    variant: 'primary',
  },
};
export const WithSecondaryIcon = {
  args: {
    iconSrc: '/src/shared/assets/images/icons/play-secondary.svg',
    children: 'Play Secondary',
    variant: 'secondary',
  },
};

export const Disabled = { args: { disabled: true, children: 'Disabled' } };
