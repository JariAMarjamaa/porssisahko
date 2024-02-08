import { Prices } from './api';
import { mockTestPrices } from "./mockData/Price-test.mock";

describe('PriceApi class tests', () => {
  
    test('getPrices returns expected values', () => {
    const expectedPrices = mockTestPrices;
    const priceApi = new Prices.constructor(mockTestPrices);
    const result = priceApi.getPrices();
    expect(result).toEqual(expectedPrices);
  });
});