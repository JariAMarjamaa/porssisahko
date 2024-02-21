import { ReadElectricityPriceData, formatTime, padWithZero } from "./ElectricityPrice.jsx";
import { mockTestPrices /*, mockTestPriceData, mockTestPriceOptions*/ } from "./mockData/Price-test.mock.jsx";
import { renderHook, act, waitFor } from '@testing-library/react'

//Riippuen kumpi on käytössä
import * as apiModule from './api';
//import { Prices } from './api';

// Mock the Prices module
/*jest.mock('./api', () => ({
  ...jest.requireActual('./api'), // Use the actual implementation for other exports from api.js
  Prices: {
    getPrices: jest.fn(),
  },
  }));*/

  // Mock the asyncFetchPrice function
//jest.mock('./api', () => ({
  //  ...jest.requireActual('./api'), // Use the actual implementation for other functions in api module
//  asyncFetchPrice: jest.fn(),
//}));

// Mock the asyncFetchPorssisahkoNet function
jest.mock('./api', () => ({
  ...jest.requireActual('./api'), // Use the actual implementation for other functions in api module
  asyncFetchPorssisahkoNet: jest.fn(), // muista laittaa const hinnat = await asyncFetchPorssisahkoNet(); päälle ElectricityPrice.jsx filessä
}));
  
describe('ElectricityPrice file tests', () => {

    test('ReadElectricityPriceData function returns correct structure and values', async () => {
      // Set up the mock implementation for asyncFetchPrice
      //apiModule.asyncFetchPrice.mockResolvedValue(mockTestPrices);
      apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
      
      // Set up the mock implementation for getPrices
      //jest.spyOn(Prices, 'getPrices').mockResolvedValue(mockTestPrices);

      const { result } = renderHook(async () => await ReadElectricityPriceData(new Date(), false));

      // Wait for the promise to resolve
      await act(async () => {
        await waitFor(() => {
          return result.current.priceData !== undefined;
        });
      });
      
      // Access the hook's result
      const { priceData, priceOptions, respState, msg } = await result.current;

      // Assertions based on the expected data
      expect(priceData.datasets.length).toBe(1);
      expect(priceData.datasets[0].label).toBe('Pohjoismaiden Sähköpörssin sähkön hinta');

      // Check each element in the data array
      expect(priceData.datasets[0].data).toHaveLength(mockTestPrices.length);
      
      mockTestPrices.forEach((expectedPrice, index) => {
        expect(priceData.datasets[0].data[index]).toEqual(parseInt(expectedPrice.hinta));
      });

      // Check other properties as needed
      expect(priceData.datasets[0].borderColor).toBe('blue');
      expect(priceData.datasets[0].fill).toBe(false);
  
      //Check options
      expect(priceOptions.responsive).toBeTruthy(); //true,      
      expect(priceOptions.maintainAspectRatio).toBeFalsy(); //false,
      expect(priceOptions.aspectRatio).toBe(2);

      // Check status and message
      expect(respState).toBe("success");
      expect(msg).toBe("Cache tyhjä. Data luettu");      
      
    });
});


describe('Helper functions tests', () => {
    test('ElectricityPrice formats time correctly', () => {
        const timeString = '2022-11-20T08:30:00';
        const formattedTime = formatTime(timeString);
        expect(formattedTime).toBe('20.11.2022 - Klo: 08');
    });

    test('padWithZero pads single-digit number with zero', () => {
        const paddedNumber = padWithZero(5);
        expect(paddedNumber).toBe('05');
    });
    
    test('padWithZero does not pad double-digit number', () => {
        const paddedNumber = padWithZero(15);
        expect(paddedNumber).toBe('15');
    });
});
  