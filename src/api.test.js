import { Prices } from './api';
import { mockTestPrices } from "./mockData/Price-test.mock";

jest.setTimeout(15000); // Set a global timeout of 15000 milliseconds (15 seconds)

describe('PriceApi class tests', () => {
  
  test('getPrices returns expected values', async () => {
    const expectedPrices = mockTestPrices;
    const priceApi = new Prices.constructor(mockTestPrices);

    // Wait for the Promise to resolve
    const result = await priceApi.getPrices();

    // Assert the resolved value
    expect(result).toEqual(expectedPrices);
  }); // Set a timeout of 15000 milliseconds (15 seconds) for this test
});
