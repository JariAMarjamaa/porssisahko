import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notification from './note';

describe('Notification component', () => {
  it('renders correctly with info note', () => {
    render(<Notification type="info" text="This is an info notification" />);
    expect(screen.getByText('This is an info notification')).toBeInTheDocument();
  });

  it('renders correctly with warning note', () => {
    render(<Notification type="warning" text="This is a warning notification" />);
    expect(screen.queryByText('This is a warning notification')).toBeInTheDocument();
  });

  it('closes the warning notification on "JEP" button click', () => {
    render(<Notification type="warning" text="This is a warning notification" />);
    fireEvent.click(screen.getByText('JEP'));
    expect(screen.queryByText('This is a warning notification')).not.toBeInTheDocument();
    //Reset situation, before next test
    sessionStorage.removeItem('warningNotificationClosed'); 
  });

  it('saves in sessionStorage when warning notification is closed', () => {
    render(<Notification type="warning" text="This is a warning notification" />);
    fireEvent.click(screen.getByText('JEP'));
    expect(sessionStorage.getItem('warningNotificationClosed')).toBe('true');
    //Reset situation, before next test
    sessionStorage.removeItem('warningNotificationClosed');
  });

  it('does not save in sessionStorage when info notification is closed', () => {
    render(<Notification type="info" text="This is an info notification" />);
    fireEvent.click(screen.getByText('JEP'));
    expect(sessionStorage.getItem('warningNotificationClosed')).toBeNull();
  });
});