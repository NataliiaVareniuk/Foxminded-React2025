import Link from './Link';

export default {
  title: 'Shared/UI/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on.*' },
  },

  argTypes: {
    children: { control: 'text', name: 'label' },
    href: { control: 'text' },
    disabled: { control: 'boolean' },
    bold: {
      control: 'select',
      options: [400, 500, 600, 700],
    },
    font: {
      control: { type: 'select' },
      options: ['Inter', 'Roboto', 'Arial', 'Courier New'],
    },

    '--primary-color': { control: 'color' },
    '--disabled-link': { control: 'color' },
    '--font-link': { control: 'text' },
    '--pressed-primary': { control: 'color' },
  },
};

export const Playground = {
  render: (args) => {
    const vars = [
      '--primary-green',
      '--disabled-link',
      '--font-link',
      '--pressed-primary',
    ];

    vars.forEach((v) => {
      if (args[v] !== undefined) {
        document.documentElement.style.setProperty(v, args[v]);
      }
    });

    return (
      <div style={{ fontFamily: args.font }}>
        <Link {...args} style={{ fontFamily: args.font, fontWeight:args.bold }}>
          {args.children}
        </Link>
      </div>
    );
  },

  args: {
    children: 'Link',
    href: 'https://example.com',
    disabled: false,
    font: 'Roboto',
    bold:'700',
    '--primary-color': '#00ae1c',
    '--disabled-link': '#b9b9b9',
    '--font-link': 'Roboto, sans-serif',
    '--pressed-primary': '#0cd52b',
  },
};

export const Default = {
  args: {
    children: 'Open example.com',
    href: 'https://example.com',
    font: 'Roboto',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled link',
    href: 'https://example.com',
    disabled: true,
    font: 'Roboto',
  },
};

export const WithCustomColor = {
  args: {
    children: 'Green link',
    href: 'https://example.com',
    font: 'Roboto',
  },
};
