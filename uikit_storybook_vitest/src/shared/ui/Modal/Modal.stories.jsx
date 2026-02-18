import { useState, useEffect } from 'react';
import Modal from './Modal';

export default {
  title: 'Shared/UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  args: {
    size: 's',
    title: 'Modal Title',
    font: 'Inter',
    isOpen: false,
  },

  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 's', 'm', 'l', 'xl'],
    },
    font: {
      control: { type: 'select' },
      options: ['Inter', 'Roboto', 'Arial', 'Courier New'],
    },
    title: { control: 'text' },
    isOpen: { control: 'boolean' },

    children: { control: 'text', name: 'content' },
    '--secondary-color': { control: 'color' },
    '--main-background': { control: 'color' },
    '--border-radius': { control: 'text' },
    '--transition-speed': { control: 'text' },
    '--text-default': { control: 'color' },
    '--modal-shadow': { control: 'text' },
    '--font-size': { control: 'text' },
    '--font-size-title': { control: 'text' },
  },
};

const ensureModalContainer = () => {
  let container = document.getElementById('modal');
  if (!container) {
    container = document.createElement('div');
    container.id = 'modal';
    document.body.appendChild(container);
  }
  return container;
};

export const Playground = (args) => {
  ensureModalContainer();
  const [open, setOpen] = useState(args.isOpen ?? false);

  const handleClose = () => {
    args.onClose?.();
    setOpen(false);
  };
  useEffect(() => {
    setOpen(args.isOpen);
  }, [args.isOpen]);

  const vars = [
    '--text-default',
    '--secondary-color',
    '--modal-shadow',
    '--main-background',
    '--border-radius',
    '--transition-speed',
    '--font-size-title',
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
        Open Modal
      </button>
      <Modal
        {...args}
        style={{ fontFamily: args.font }}
        isOpen={open}
        onClose={handleClose}
      >
        {args.children ?? 'This is the modal content.'}
      </Modal>
    </div>
  );
};

Playground.args = {
  isOpen: false,
  size: 's',
  title: 'Example Modal',
  children: 'Modal body ',
  font: 'Inter',
  '--main-background': '#ffffff',
  '--border-radius': '8px',
  '--transition-speed': '0.3s',
  '--text-default': '#323749',
  '--modal-shadow': '0 16px 50px 0 rgba(0, 0, 0, 0.24)',
  '--secondary-color': '#dedfe5',
  '--font-size': '16px',
  '--font-size-title': '24px',
};

export const WithLongContent = (args) => {
  ensureModalContainer();

  const long = new Array(50)
    .fill('This is a long piece of modal content.')
    .join(' ');

  return (
    <Modal {...args} isOpen={true}>
      {long}
    </Modal>
  );
};
