import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import Modal from './Modal';
import { expect, test } from 'vitest';

import { vi } from 'vitest';

describe('Modal with portal', () => {
  let container;
  let user;
  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'modal');
    document.body.appendChild(container);
    user = userEvent.setup();
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('should render portal content when container exists and call onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(
      <Modal title="Test Title" isOpen onClose={handleClose}>
        Content
      </Modal>,
    );
    const modalTitle = screen.getByText(/test title/i);
    const closeModalButton = screen.getByLabelText(/close modal/i);

    await user.click(closeModalButton);

    expect(modalTitle).toBeInTheDocument();
    expect(closeModalButton).toBeInTheDocument();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('should not render modal when isOpen is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal title="Test Title" isOpen={false} onClose={handleClose}>
        Content
      </Modal>,
    );
    const modalTitle = screen.queryByText(/test title/i);

    expect(modalTitle).not.toBeInTheDocument();
  });

  test('should call onClose when clicking outside modal content', async () => {
    const handleClose = vi.fn();
    render(
      <Modal title="Test Title" isOpen onClose={handleClose}>
        Content
      </Modal>,
    );

    const backdrop = screen.getByRole('dialog').parentElement;
    
    await user.click(backdrop);

    expect(backdrop).toBeInTheDocument();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('should not call onClose when clicking inside modal content', async () => {
    const handleClose = vi.fn();
    render(
      <Modal title="Test Title" isOpen onClose={handleClose}>
        Content
      </Modal>,
    );
    const modalContent = screen.getByText(/content/i);

    await user.click(modalContent);

    expect(handleClose).not.toHaveBeenCalled();
  });

  test('should call onClose when the close button is clicked', async () => {
    const handleClose = vi.fn();
    render(
      <Modal title="Test Title" isOpen onClose={handleClose}>
        Content
      </Modal>,
    );

    const closeButton = screen.getByLabelText(/close modal/i);

    await user.click(closeButton);

    expect(closeButton).toBeInTheDocument();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('should call onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal title="Test Title" isOpen onClose={handleClose}>
        Content
      </Modal>,
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('should focus modal when it is opened', () => {
    render(
      <Modal title="Test Title" isOpen>
        Content
      </Modal>,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveFocus();
  });
});

describe('Modal without portal', () => {
  test('should not render portal content when container does not exist', () => {
    const handleClose = vi.fn();
    render(
      <Modal title="Test Title" isOpen onClose={handleClose}>
        Content
      </Modal>,
    );

    const modalTitle = screen.queryByText(/test title/i);
    
    expect(modalTitle).not.toBeInTheDocument();
  });
});
