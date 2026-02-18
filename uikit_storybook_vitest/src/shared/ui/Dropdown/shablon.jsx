export const Playground = {
  render: (args) => {
    const vars = [
      '--primary-green',
      '--white-text',
      '--border-green',
      '--hover-shadow',
      '--pressed-green',
      '--disabled-primary',
      '--disabled-green',
      '--secondary-grey',
      '--text-default',
      '--hover-grey',
      '--secondary-shadow',
      '--pressed-grey',
      '--underline-default',
      '--border-grey',
      '--disabled-grey',
      '--shadow',
      '--btn-size-xs',
      '--btn-size-s',
      '--btn-size-m',
      '--btn-size-l',
      '--btn-size-xl',
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

    '--primary-green': '#00ae1c',
    '--white-text': '#ffffff',
    '--border-green': '#5ce171',
    '--hover-shadow': '0 2px 2px 0 rgba(92, 225, 113, 0.25)',
    '--pressed-green': '#0cd52b',
    '--disabled-primary': '#b9b9b9',
    '--disabled-green': '#187727',

    '--secondary-grey': '#dedfe5',
    '--text-default': '#323749',
    '--hover-grey': '#efefef',
    
    '--secondary-shadow': '0 1px 2px 0 rgba(69, 69, 69, 0.25))',
    '--pressed-grey': '#e0e0e0',
    '--underline-default': '#737373',
    '--border-grey': '#8d8e91',
    '--disabled-grey': '#c8c8c8',
    '--shadow': '0 1px 2px 0 rgba(69, 69, 69, 0.25)',

    '--btn-size-xs': '25px',
    '--btn-size-s': '43px',
    '--btn-size-m': '63px',
    '--btn-size-l': '83px',
    '--btn-size-xl': '103px',

    '--border-radius': '8px',
    '--transition-speed': '0.2s',
  },
};
