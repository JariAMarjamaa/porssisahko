import { Prices } from './api';
import { mockTestPrices } from "./mockData/Price-test.mock";

jest.setTimeout(11000); // Set a global timeout of 11000 milliseconds (11 seconds), min to pass api test

describe('PriceApi class tests', () => {
  
  test('getPrices returns expected values', async () => {
    const expectedPrices = mockTestPrices;
    const priceApi = new Prices.constructor(mockTestPrices);

    // Wait for the Promise to resolve
    const result = await priceApi.getPrices();

    // Assert the resolved value
    expect(result).toEqual(expectedPrices);
  }); // Set a timeout for this test
});
