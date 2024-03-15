import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import LogIn from './index.jsx';

//npm install --save-dev @reduxjs/toolkit redux-mock-store
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { StateProvider } from '../State';
import mainReducer from "../store/reducers/index.js";

import { mockUser } from "../mockData/user.mock.jsx";

const mockStore = configureMockStore([]);
const mockInitialState = {
  login: {
    state: "MOCK_STATE",
    status: 0,
    logging: false,
    userIds: [],
    infoText: null
  },
}; 

// Create a mock store with the initial state
const store = mockStore(mockInitialState);

// This is the function we'll be testing
/*async function withFetch() {
  const res = await fetch("https://backend-nu-mauve.vercel.app/LogIn")
  const json = await res.json()
  return json
}*/

describe('Login component', () => {
  test('renders Login component', () => {
    // Mock the callback function
    //const mockUserSelection = jest.fn();
    //render(<LogIn returnResponse={mockUserSelection} />);
    //render(<LogIn />);
    render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockInitialState}>
          <LogIn/>
        </StateProvider>
      </Provider>
    );

    expect(screen.getByText('Pörssisähkökäppyrä harjoitus')).toBeInTheDocument();
    expect(screen.getByText("Sisäänkirjautuminen:")).toBeInTheDocument();
  });

  test('renders userid input', () => {
    // Mock the callback function
    const mockUserSelection = jest.fn();
    //render(<LogIn returnResponse={mockUserSelection} />);
    render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockInitialState}>
          <LogIn />
        </StateProvider>
      </Provider>
    );
    // Find the userID input
    const userIdInput = screen.getByPlaceholderText('Tunnus');
    
    act(() => {
      // Simulate typing a password
      fireEvent.change(userIdInput, { target: { value: mockUser.userID } });
    });
  
    // Check if the password input value is updated
    expect(userIdInput).toHaveValue('MockUser');
  });

  test('renders password input with toggle visibility button', () => {
    // Mock the callback function
    const mockUserSelection = jest.fn();
    //const { getByTestId } = render(<LogIn returnResponse={mockUserSelection} />);
    const { getByTestId } = render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockInitialState}>
          <LogIn />
        </StateProvider>
      </Provider>
    );
    
    // Find the password input
    const passwordInput = screen.getByPlaceholderText('Salasana');
    
    // Find the toggle visibility button
    const toggleButton = getByTestId('RFW_TooglePassWordVisibility');
  
    // Initial state check
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    // Simulate typing a password
    act(() => {
      fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    });
  
    // Check if the password input value is updated
    expect(passwordInput).toHaveValue('MockPassword');
    // Simulate clicking the toggle button
    act(() => {
      fireEvent.click(toggleButton);
    });
  
    // Check if the password input type is now 'text'
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Simulate clicking the toggle button again
    act(() => {
      fireEvent.click(toggleButton);
    });
  
    // Check if the password input type is back to 'password'
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  
  test('Returns login ok', async () => {
    // This is the section where we mock `fetch`
    const unmockedFetch = global.fetch

    //beforeAll(() => {
      global.fetch = () =>
        Promise.resolve({
        json: () => Promise.resolve({ userId: mockUser.userID }),
        status: 200, // Mock the HTTP status code
      });
    //})

    //afterAll(() => {
    //  global.fetch = unmockedFetch
    //})

    const LogInResponseMock = jest.fn();

    //const { getByTestId } = render(<LogIn returnResponse={LogInResponseMock} />);
    const { getByTestId } = render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockInitialState}>
          <LogIn returnResponse={LogInResponseMock}/>
        </StateProvider>
      </Provider>
    );

    act(() => {
    // Find the userID input
    const userIdInput = screen.getByPlaceholderText('Tunnus');
    
    // Simulate typing a password
    fireEvent.change(userIdInput, { target: { value: mockUser.userID } });

    // Find the password input
    const passwordInput = screen.getByPlaceholderText('Salasana');
    
    // Simulate typing a password
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
  
    // Find the LogIn button
    const LogInButton = getByTestId('RFW_LogInButton');
    
    // Simulate clicking the toggle button
    fireEvent.click(LogInButton);
  });

    //const json = await withFetch(); //  =>  Jest worker encountered 4 child process exceptions, exceeding retry limit
    
    // Check if the login has succeeded
    act(() => {
      setTimeout(async () => {
        await waitFor(() => {
          expect(LogInResponseMock).toHaveBeenCalledTimes(1);
          expect(LogInResponseMock).toHaveBeenCalledWith(true);
        });
      }, 10000);
    });
 
    global.fetch = unmockedFetch;

  });
  

});