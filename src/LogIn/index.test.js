import { render, screen, fireEvent, waitFor, act, renderHook } from '@testing-library/react';
import LogInPage from './index.jsx';

//npm install --save-dev @reduxjs/toolkit redux-mock-store
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { StateProvider } from '../State';
import mainReducer from "../store/reducers/index.js";

import { mockUser } from "../mockData/user.mock.jsx";
import { mockStoreInitialState } from "../mockData/store.mock.jsx";

//pitää olla täälläkin mokattuna, koska renderöidään OK login jälkeen
import { mockTestPrices } from "../mockData/Price-test.mock.jsx";
import * as apiModule from '../api';
// Myös käppyrä itse
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => null), 
}));

// Mock the asyncFetchPorssisahkoNet function
jest.mock('../api', () => ({
  ...jest.requireActual('../api'), 
  asyncFetchPorssisahkoNet: jest.fn(), 
}));

const mockStore = configureMockStore([]);

describe('Login component', () => {
  test('renders Login component', () => {
    // Create a mock store with the initial state
    const store = mockStore(mockStoreInitialState);

    render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
          <LogInPage/>
        </StateProvider>
      </Provider>
    );

    expect(screen.getByText('Pörssisähkökäppyrä harjoitus')).toBeInTheDocument();
    expect(screen.getByText("Sisäänkirjautuminen:")).toBeInTheDocument();
  });

  test('renders userid input', () => {
    // Create a mock store with the initial state
    const store = mockStore(mockStoreInitialState);

    render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
          <LogInPage />
        </StateProvider>
      </Provider>
    );
    // Find the userID input
    const userIdInput = screen.getByPlaceholderText('Tunnus');
    
    // Simulate typing a password
      fireEvent.change(userIdInput, { target: { value: mockUser.userID } });
  
    // Check if the password input value is updated
    expect(userIdInput).toHaveValue('MockUser');
  });

  test('renders password input with toggle visibility button', () => {
    // Create a mock store with the initial state
    const store = mockStore(mockStoreInitialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
          <LogInPage />
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
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
  
    // Check if the password input value is updated
    expect(passwordInput).toHaveValue('MockPassword');
    // Simulate clicking the toggle button
    fireEvent.click(toggleButton);
  
    // Check if the password input type is now 'text'
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Simulate clicking the toggle button again
    fireEvent.click(toggleButton);
  
    // Check if the password input type is back to 'password'
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  
  xtest('Returns login ok', async () => {
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

    // Create a mock store with the initial state
    const store = mockStore(mockStoreInitialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
          <LogInPage/>
        </StateProvider>
      </Provider>
    );

    apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);

    await act(async () => {
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

    global.fetch = unmockedFetch;

  });
});