import { useEffect, useState } from 'react';
import Toast from './Toast';

export default {
  title: 'Shared/UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    message: { control: 'text' },
    duration: { control: 'number' },
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },

    '--main-background': { control: 'color' },
    '--text-default': { control: 'color' },
    '--border-radius': { control: 'text' },
    '--border-radius-small': { control: 'text' },
    '--modal-shadow': { control: 'text' },
    '--transition-speed': { control: 'text' },
    '--secondary-color': { control: 'color' },
    '--font-size': { control: 'text' },
  },
};

export const Playground = {
  render: (args) => {
    const [open, setOpen] = useState(args.isOpen ?? false);

    useEffect(() => {
      setOpen(args.isOpen ?? false);
    }, [args.isOpen]);

    const handleClose = () => {
      setOpen(false);
      args.onClose?.();
    };

    const vars = [
      '--main-background',
      '--text-default',
      '--border-radius',
      '--border-radius-small',
      '--modal-shadow',
      '--transition-speed',
      '--secondary-color',
      '--font-size',
    ];
    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    return (
      <div>
        <button type="button" onClick={() => setOpen(true)}>
          Show Toast
        </button>

        <Toast
          message={args.message}
          duration={args.duration}
          isOpen={open}
          onClose={handleClose}
        />
      </div>
    );
  },

  args: {
    message: 'This is a toast message',
    duration: 3000,
    isOpen: false,
    '--main-background': '#ffffff',
    '--text-default': '#323749',
    '--border-radius': '8px',
    '--border-radius-small': '4px',
    '--modal-shadow': '0 2px 8px rgba(0,0,0,0.12)',
    '--transition-speed': '0.3s',
    '--secondary-color': '#efefef',
    '--font-size': '15px',
  },
};

export const Open = {
  render: (args) => (
    <Toast
      message={args.message}
      duration={args.duration}
      isOpen={true}
      onClose={args.onClose}
    />
  ),
  args: {
    message: 'Open toast',
    duration: 5000,
  },
};

export const Quick = {
  render: (args) => (
    <Toast
      message={args.message}
      duration={args.duration}
      isOpen={true}
      onClose={args.onClose}
    />
  ),
  args: {
    message: 'Quick toast',
    duration: 500,
  },
};

export const WithLongMessage = {
  render: (args) => (
    <Toast
      message={args.message}
      duration={args.duration}
      isOpen={true}
      onClose={args.onClose}
    />
  ),
  args: {
    message:
      'This is a longer toast message that should wrap and show how the toast displays longer text items without breaking layout.',
    duration: 4000,
  },
};
