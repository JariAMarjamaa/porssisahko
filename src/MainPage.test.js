import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App.jsx';

import { mockTestPrices} from "./mockData/Price-test.mock.jsx";

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { StateProvider } from './State';
import mainReducer from "./store/reducers/index.js";
import { mockStoreInitialState } from "./mockData/store.mock.jsx";
const mockStore = configureMockStore([]);

//Riippuen kumpi käytössä
import * as apiModule from './api';
//import { Prices } from './api';

// Mock the Prices module
/*jest.mock('./api', () => ({
  ...jest.requireActual('./api'), // Use the actual implementation for other exports from api.js
  Prices: {
    getPrices: jest.fn(),
  },
  //Prices: new (class PriceApi {
  //    getPrices() {
  //      return mockTestPrices;
  //    }
  //  })(),
  }));*/

// Mock the asyncFetchPorssisahkoNet function / asyncFetchPrice
jest.mock('./api', () => ({
  ...jest.requireActual('./api'), // Use the actual implementation for other functions in api module
  //asyncFetchPrice: jest.fn(), // muista laittaa const hinnat = await asyncFetchPrice(); päälle ElectricityPrice.jsx filessä
  asyncFetchPorssisahkoNet: jest.fn(), // muista laittaa const hinnat = await asyncFetchPorssisahkoNet(); päälle ElectricityPrice.jsx filessä
}));

// Mock the Line component
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => null), 
}));

describe('Mainpage component', () => {
  test('Renders Mainpage component', async () => {
    // Update the mock state to simulate successful login
    //const mockState = { ...mockStoreInitialState, login: { ...mockStoreInitialState.login, state: "LOGIN_SUCCEEDED" } };
    // Create a mock store with the initial state
    //const store = mockStore(mockState);
    
    var mockState = mockStoreInitialState;
    mockState.login.state = "LOGIN_SUCCEEDED";
    // Create a mock store with the initial state
    const store = mockStore(mockState);

    // Set up the mock implementation for asyncFetchPrice
    //apiModule.asyncFetchPrice.mockResolvedValue(mockTestPrices);
    apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
    
    // Set up the mock implementation for getPrices
    //Prices.getPrices.mockResolvedValue(mockTestPrices);
    // Mock the getPrices method
    //jest.spyOn(Prices, 'getPrices').mockResolvedValue(mockTestPrices);

    await act(async () => {
    //act(() => {
      render(
        <Provider store={store}>
          <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
          <App />
          </StateProvider>
        </Provider>
      );
    });

    //screen.debug(); //koko DOM
    // Regular expressions for flexible text matching
    const dateTitle = /Päiväys:/;

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      act(() => {
        expect(screen.getByText(dateTitle)).toBeInTheDocument();
      });
    });
  });
});