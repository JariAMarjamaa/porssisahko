import { formatDateTime, formatDate, formatTime, padWithZero }  from './stringFormating';
import { formatPriceCacheForExcel }  from './cacheDataFormating.tsx';

describe('Helper functions tests', () => {
    test('Format time correctly', () => {
        const string = '2022-11-20T08:30:00';
        const formattedTime = formatTime(string);
        expect(formattedTime).toBe('Klo: 08');
    });

    test('Format Date correctly', () => {
        const string = '2022-11-20T08:30:00';
        const formattedDate = formatDate(string);
        expect(formattedDate).toBe('20.11.2022');
      });

    test('Format formatDateTime correctly', () => {
      const string = '2022-11-20T08:30:00';
      const formattedDate = formatDateTime(string);
      expect(formattedDate).toBe('20.11.2022 - Klo: 08');
    });

    test('padWithZero pads single-digit number with zero', () => {
        const paddedNumber = padWithZero(5);
        expect(paddedNumber).toBe('05');
    });
    
    test('padWithZero does not pad double-digit number', () => {
        const paddedNumber = padWithZero(15);
        expect(paddedNumber).toBe('15');
    });

    test('formatPriceCacheForExcel returns correctly response from empty cache', () => {
        let [respData, errorMsg] = formatPriceCacheForExcel();
        expect(respData).toBe(null);
        expect(errorMsg).toContain("Virhe. Pörssi on tyhjä! \n Ei saatavilla hintatietoja!");
    });

    test('formatPriceCacheForExcel returns correctly formated data', () => {
        // Mock the localStorage methods
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
        };
  
        // Override the actual localStorage methods
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
        });
  
        // Mock the initial state
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ data: [{ aikaleima_suomi: '2023-02-26T23:59', hinta: 7.201 }] }));
 
        let [respData, errorMsg] = formatPriceCacheForExcel();
        // Access the first element of the array (assuming there's only one)
        const firstItem = respData[0];
        expect(firstItem.pvm).toBe('26.02.2023');
        expect(firstItem.klo).toBe('Klo: 24');
        expect(firstItem.hinta).toBe(7.201);
        expect(errorMsg).toBe(null);
    });
});
  