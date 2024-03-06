import { render, screen } from '@testing-library/react';
import LogIn from './index.jsx';

// Mock the callback function
const mockUserSelection = jest.fn();

describe('Login component', () => {
  test('renders Login component', () => {

    render(<LogIn handleLogIn={mockUserSelection} />);

    expect(screen.getByText('Pörssisähkökäppyrä harjoitus')).toBeInTheDocument();
    expect(screen.getByText("Sisäänkirjautuminen:")).toBeInTheDocument();

  });
});