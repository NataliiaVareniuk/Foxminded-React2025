
import { render, screen, userEvent} from '@testing-library/react';
import Textarea from './Textarea';
import { test } from 'vitest';



describe('Textarea', () => {
  let user;

  beforeEach(() => {
  user = userEvent.setup();
  });

  test('should render the label and the textarea', () => {
    render(<Textarea label="Notes" value={'hi'} onChange={() => {}} />);

    const label = screen.getByText(/notes/i);
    const textarea = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
  });

  test('should render the textarea with the correct value', () => {
    render(
      <Textarea label="Comments" value={'Hello World'} onChange={() => {}} />,
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Hello World');
  });

  test('should call onChange when the textarea value changes', async () => {
    const handleChange = vi.fn();
    render(<Textarea label="Feedback" value={''} onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'Test!');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('Test!');
  });

  test('should render the textarea with a placeholder', () => {
    render(
      <Textarea
        label="Description"
        value={''}
        onChange={() => {}}
        placeholder="Enter text here..."
      />,
    );
    const textarea = screen.getByPlaceholderText(/enter text here.../i);
    expect(textarea).toBeInTheDocument();
  });

  test('should render the textarea as disabled', () => {
    render(
      <Textarea
        label="Disabled"
        value={'disabled'}
        onChange={() => {}}
        disabled
      />,
    );
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeDisabled();
  });
});
