import { render, screen, act, waitFor } from '@testing-library/react';
import MainPage from './MainPage.tsx';
import { mockTestPrices} from "./mockData/Price-test.mock.jsx";

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

// Mock the asyncFetchPrice function
//jest.mock('./api', () => ({
//  ...jest.requireActual('./api'), // Use the actual implementation for other functions in api module
//asyncFetchPrice: jest.fn(), // muista laittaa const hinnat = await asyncFetchPrice(); päälle ElectricityPrice.jsx filessä
//}));

// Mock the asyncFetchPorssisahkoNet function
jest.mock('./api', () => ({
  ...jest.requireActual('./api'), // Use the actual implementation for other functions in api module
  asyncFetchPorssisahkoNet: jest.fn(), // muista laittaa const hinnat = await asyncFetchPorssisahkoNet(); päälle ElectricityPrice.jsx filessä
}));

// Mock the Line component
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => null), 
}));

// Mock the callback function
const mockHandleLogout = jest.fn();

describe('Mainpage component', () => {
  test('Renders Mainpage component', async () => {
    // Set up the mock implementation for asyncFetchPrice
    //apiModule.asyncFetchPrice.mockResolvedValue(mockTestPrices);
    apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
    
    // Set up the mock implementation for getPrices
    //Prices.getPrices.mockResolvedValue(mockTestPrices);
    // Mock the getPrices method
    //jest.spyOn(Prices, 'getPrices').mockResolvedValue(mockTestPrices);

    await act(async () => {
      render(<MainPage handleLogOut={mockHandleLogout} />);
    });

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