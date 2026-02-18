/** @type { import('@storybook/react-vite').Preview } */
import '../src/shared/assets/styles/base/index.scss';



const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
    
      test: 'todo',
    },
  },
};

export default preview;
