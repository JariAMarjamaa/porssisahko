import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import LogIn from './index.jsx';

// This is the function we'll be testing
/*async function withFetch() {
  const res = await fetch("https://backend-nu-mauve.vercel.app/LogIn")
  const json = await res.json()
  return json
}*/

describe('Login component', () => {
  test('renders Login component', () => {
    // Mock the callback function
    const mockUserSelection = jest.fn();
    render(<LogIn returnResponse={mockUserSelection} />);

    expect(screen.getByText('Pörssisähkökäppyrä harjoitus')).toBeInTheDocument();
    expect(screen.getByText("Sisäänkirjautuminen:")).toBeInTheDocument();

  });

  test('renders userid input', () => {
    // Mock the callback function
    const mockUserSelection = jest.fn();
    render(<LogIn returnResponse={mockUserSelection} />);
    
    // Find the userID input
    const userIdInput = screen.getByPlaceholderText('Tunnus');
    
    // Simulate typing a password
    fireEvent.change(userIdInput, { target: { value: 'myUserId' } });
  
    // Check if the password input value is updated
    expect(userIdInput).toHaveValue('myUserId');
  });

  test('renders password input with toggle visibility button', () => {
    // Mock the callback function
    const mockUserSelection = jest.fn();
    const { getByTestId } = render(<LogIn returnResponse={mockUserSelection} />);
    
    // Find the password input
    const passwordInput = screen.getByPlaceholderText('Salasana');
    
    // Find the toggle visibility button
    const toggleButton = getByTestId('RFW_TooglePassWordVisibility');
  
    // Initial state check
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Simulate typing a password
    fireEvent.change(passwordInput, { target: { value: 'mySecretPassword' } });
  
    // Check if the password input value is updated
    expect(passwordInput).toHaveValue('mySecretPassword');
  
    // Simulate clicking the toggle button
    fireEvent.click(toggleButton);
  
    // Check if the password input type is now 'text'
    expect(passwordInput).toHaveAttribute('type', 'text');
  
    // Simulate clicking the toggle button again
    fireEvent.click(toggleButton);
  
    // Check if the password input type is back to 'password'
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  /*
  test('Returns login ok', () => {
    // This is the section where we mock `fetch`
    const unmockedFetch = global.fetch

    //beforeAll(() => {
      global.fetch = () =>
        Promise.resolve({
        json: () => Promise.resolve({ response: "OK", errorMsg: "LogIn Ok" }),
        status: 200, // Mock the HTTP status code
      });
    //})

    //afterAll(() => {
    //  global.fetch = unmockedFetch
    //})

    const LogInResponseMock = jest.fn();

    const { getByTestId } = render(<LogIn returnResponse={LogInResponseMock} />);
    
    // Find the userID input
    const userIdInput = screen.getByPlaceholderText('Tunnus');
    
    // Simulate typing a password
    fireEvent.change(userIdInput, { target: { value: 'myUserId' } });

    // Find the password input
    const passwordInput = screen.getByPlaceholderText('Salasana');
    
    // Simulate typing a password
    fireEvent.change(passwordInput, { target: { value: 'mySecretPassword' } });
  
    // Find the LogIn button
    const LogInButton = getByTestId('RFW_LogInButton');
    
    // Simulate clicking the toggle button
    //await act(async () => {
      fireEvent.click(LogInButton);
    //});

    //const json = await withFetch(); //  =>  Jest worker encountered 4 child process exceptions, exceeding retry limit
    
    // Check if the login has succeeded
    waitFor(() => {
    //  act(() => {
        expect(LogInResponseMock).toHaveBeenCalledTimes(1);
        expect(LogInResponseMock).toHaveBeenCalledWith(true);
    //    });
    });
    
    global.fetch = unmockedFetch

  });
  */

});