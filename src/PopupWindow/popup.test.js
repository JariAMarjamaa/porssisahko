import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PopupWindow from './Popup';

describe('PopupWindow component', () => {
  it('renders content correctly for type "text"', () => {
    const onCloseMock = jest.fn();
    const contentText = 'This is a text content';
    render(<PopupWindow onClose={onCloseMock} type="text" content={contentText} />);

    expect(screen.getByText(contentText)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sulje' })).toBeInTheDocument();
  });

  it('renders video iframe for type "video"', () => {
    const onCloseMock = jest.fn();
    render(<PopupWindow onClose={onCloseMock} type="video" />);

    expect(screen.getByTitle('Viteo soitin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sulje' })).toBeInTheDocument();
  });

  it('calls onClose callback when "Sulje" button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<PopupWindow onClose={onCloseMock} type="text" content="Some content" />);

    const closeButton = screen.getByRole('button', { name: 'Sulje' });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});