import { formatDate, formatTime, padWithZero }  from './stringFormating';

  
describe('Helper functions tests', () => {
    test('Format time correctly', () => {
        const string = '2022-11-20T08:30:00';
        const formattedTime = formatTime(string);
        expect(formattedTime).toBe('20.11.2022 - Klo: 08');
    });

    test('Format date correctly', () => {
      const string = '2022-11-20T08:30:00';
      const formattedDate = formatDate(string);
      expect(formattedDate).toBe('20.11.2022');
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
  