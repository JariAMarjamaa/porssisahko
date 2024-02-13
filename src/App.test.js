import { render, screen, act, waitFor } from '@testing-library/react';
import App from './App';
import { mockTestPrices} from "./mockData/Price-test.mock.jsx";
//import * as apiModule from './api';
import { Prices } from './api';

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

// Mock the Line component
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => null), 
}));

describe('App component', () => {
  test('renders App component', async () => {
    // Set up the mock implementation for asyncFetchPrice
    //apiModule.asyncFetchPrice.mockResolvedValue(mockTestPrices);
    
    // Set up the mock implementation for getPrices
    //Prices.getPrices.mockResolvedValue(mockTestPrices);
    // Mock the getPrices method
    jest.spyOn(Prices, 'getPrices').mockResolvedValue(mockTestPrices);


    //render(<App />);
    await act(async () => {
      render(<App />);
    });

    // Regular expressions for flexible text matching
    const lowestTextRegex = /Halvin hinta on 1/;
    const highestTextRegex = /Korkein hinta on 100/;

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      act(() => {
        //console.log("TEST: " + screen.getByText(lowestTextRegex)?.textContent);

        // Your assertions here
        expect(screen.getByText('Pörssisähkökäppyrä harjoitus')).toBeInTheDocument();
        expect(screen.getByText(lowestTextRegex)).toBeInTheDocument();
        expect(screen.getByText(highestTextRegex)).toBeInTheDocument();
      });
    });
  });
});