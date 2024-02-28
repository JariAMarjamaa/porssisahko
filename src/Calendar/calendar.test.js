//import { renderHook, act, waitFor } from '@testing-library/react'
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Calendar from './calendar';
import MockDate from 'mockdate';

// npm install --save-dev mockdate
//npm install --save-dev @testing-library/react@latest
describe('Calendar component', () => {

/*  beforeAll(() => {
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
        matches: query === '(min-width:600px)',
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    })
  })

  afterAll(() => {
    delete window.matchMedia
  })*/

  const CACHE_KEY = 'userReguests';
  //dayjs.locale('fi');
  // Set a specific date for testing
  const mockDate = new Date('2023-05-31T00:00:00.000');
  //const mockDate = new Date('2023-05-31');
  mockDate.setDate(mockDate.getDate() /*- 1*/); 

  //console.log("TEST. mockDate: ", mockDate.toString());

/*  const localStorageMock = {
    getItem: jest.fn(key => {
      if (key === CACHE_KEY) {
        return JSON.stringify({ count: 0, week: 0, year: 0 });
      } else if (key === CACHE_KEY_DATA) {
        return JSON.stringify({
          data: [
            { aikaleima_suomi: 'someDate1' },
            { aikaleima_suomi: 'someDate2' },
            // Add more data as needed
          ],
          // Add other properties as needed
        });
      }
      return null;
    }),
    setItem: jest.fn(),
  };*/

  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  
  beforeEach(() => {
    MockDate.set(mockDate);
  
    // Reset mock between tests
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    
    // Override the actual localStorage methods
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    MockDate.reset();
  });

  test('renders ChartSwitch component', () => {
    render(<Calendar dateSelected UpdateChart />);
  });

  test('Read default date', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    expect(screen.getAllByText("Valitse päätöspäivä")[0]).toBeInTheDocument();

    // Simulate Calendar opening data-testid="CalendarIcon"
    const CalendarElement = screen.getByTestId('CalendarIcon'); // RFW_CalendarTitle
    fireEvent.click(CalendarElement);

    const startDateInput = screen.getByTestId('RFW_DatePickerInputID');
    fireEvent.click(startDateInput);

    screen.debug(startDateInput);
    // Assert that the selected date is displayed in the input
    expect(startDateInput.value).toBe('31/05/2023');
  });

  test('OK without day selection, and Cancel wont do anything', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    // Class componentille, mutta ei toimi functionaalisella komponentilla
    // Spy on the handleAccept function
    //jest.spyOn(Calendar.prototype, 'handleAccept');

    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    // Simulate Calendar opening
    const CalendarElement = screen.getByTestId('CalendarIcon');
    fireEvent.click(CalendarElement);
    
    const OkButton = screen.getByText('OK');
    fireEvent.click(OkButton);

    expect(mockhandleSelectedDate).not.toHaveBeenCalled();
    expect(mockUpdateChart).not.toHaveBeenCalled();
    //expect(Calendar.prototype.handleAccept).not.toHaveBeenCalled();

    const CancelButton = screen.getByText('Peruuta');
    fireEvent.click(CancelButton);

    expect(mockhandleSelectedDate).not.toHaveBeenCalled();
    expect(mockUpdateChart).not.toHaveBeenCalled();


  });

  test('Day selection button is found', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    // Simulate Calendar opening data-testid="CalendarIcon"
    const CalendarElement = screen.getByTestId('CalendarIcon');
    fireEvent.click(CalendarElement);

    const chosenDate = screen.getByRole('gridcell', { name: "15"}); // choose any date that the calender shows
    expect(chosenDate).toBeInTheDocument();
    fireEvent.click(chosenDate);
  });

  test('OK+Search returns selected date', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    // Mock the initial state
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ count: 0, week: 0, year: 0 }));
 
    //jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({ count: 0, week: 0, year: 0 }));

    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    // Simulate Calendar opening data-testid="CalendarIcon"
    const CalendarElement = screen.getByTestId('CalendarIcon'); // RFW_CalendarTitle
    fireEvent.click(CalendarElement);

    const chosenDate = screen.getByRole('gridcell', { name: "15"}); // choose any date that the calender shows
    expect(chosenDate).toBeInTheDocument();
    fireEvent.click(chosenDate);

    const OkButton = screen.getByText('OK');
    expect(OkButton).toBeInTheDocument();
    fireEvent.click(OkButton);
    
    const searchButton = screen.getByText('Hae hinnat');
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);

    //screen.debug(searchButton);

    //Jostain syystä kalenteri palauttaa aina tässä muodossa
    //Wed May 15 2023 00:00:00 GMT+0300 (Itä-Euroopan kesäaika) <= varsinainen implementaatio
    //Calendar. handleDateChange. formatDate: 2023-05-14T21:00:00.000Z
    //Calendar. handleSearch. selectedDate:  2023-05-15T08:00:00.000Z <= lisätty se11hrs
    const selectedDate = new Date('2023-05-15');
    selectedDate.setHours(selectedDate.getHours() + 8);

    expect(mockhandleSelectedDate).toHaveBeenCalledTimes(1);
    expect(mockhandleSelectedDate).toHaveBeenCalledWith(selectedDate);

    // EI TOIMI BEFORE ALL:n kanssa
    // Simulate Calendar opening
    //const DatePicker = screen.getByTestId('CalendarIcon'); //CalendarIcon
    //fireEvent.click(DatePicker);
    //screen.debug(DatePicker);
  });

  test('Check localStore update with first Request', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    // Mock the initial state
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ count: 0, week: 0, year: 0 }));
   
    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    // Simulate Calendar opening data-testid="CalendarIcon"
    const CalendarElement = screen.getByTestId('CalendarIcon'); // RFW_CalendarTitle
    fireEvent.click(CalendarElement);

    const chosenDate = screen.getByRole('gridcell', { name: "15"}); // choose any date that the calender shows
    expect(chosenDate).toBeInTheDocument();
    fireEvent.click(chosenDate);

    const OkButton = screen.getByText('OK');
    expect(OkButton).toBeInTheDocument();
    fireEvent.click(OkButton);
    
    const searchButton = screen.getByText('Hae hinnat');
    expect(searchButton).toBeInTheDocument();
    fireEvent.click(searchButton);

    // Now check the final state of localStorage
    expect(localStorageMock.getItem).toHaveBeenCalledWith(CACHE_KEY);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(CACHE_KEY,JSON.stringify({ count: 1, week: 22, year: 2023 }));

    // Check first call
    //expect(localStorageMock).toHaveBeenNthCalledWith(1, CACHE_KEY, JSON.stringify({ count: 1, week: 22, year: 0 }));
    // Check last call
    //expect(localStorageMock).toHaveBeenLastCalledWith(CACHE_KEY, JSON.stringify({ count: 1, week: 22, year: 0 }));
  });

  xtest('Check localStore handling when user request are used', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    // Mock the initial state
    localStorageMock.getItem.mockReturnValue(JSON.stringify({ count: 2, week: 22, year: 2023 }));
   
    // if (cachedData.count < 2 || getISOWeekYear(today) > cachedData.year) {
    // if (getISOWeek(today) !== cachedData.week || getISOWeekYear(today) > cachedData.year) {  
    // Assert that document.createElement was called with the appropriate arguments
    //expect(createElementSpy).toHaveBeenCalledWith('a'); 

    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    // Assert that localStorage.getItem was called
    //expect(localStorageMock.getItem).toHaveBeenCalledWith(CACHE_KEY, JSON.stringify({ count: 0, week: 0, year: 0 }));

    // Simulate Calendar opening data-testid="CalendarIcon"
    const CalendarElement = screen.getByTestId('CalendarIcon'); // RFW_CalendarTitle
    fireEvent.click(CalendarElement);

    const chosenDate = screen.getByRole('gridcell', { name: "15"}); // choose any date that the calender shows
    expect(chosenDate).toBeInTheDocument();
    fireEvent.click(chosenDate);

    const OkButton = screen.getByText('OK');
    expect(OkButton).toBeInTheDocument();
    fireEvent.click(OkButton);
    
    screen.debug(); //koko DOM

    //const searchButton = screen.getByText('Hae hinnat');
    //expect(searchButton).toBeInTheDocument();
    //fireEvent.click(searchButton);

    // Now check the final state of localStorage
    //expect(localStorageMock.getItem).toHaveBeenCalledWith(CACHE_KEY);
    //expect(localStorageMock.setItem).toHaveBeenCalledWith(CACHE_KEY,JSON.stringify({ count: 1, week: 22, year: 2023 }));

    // Assert that localStorage.getItem was called
    //expect(localStorageMockSet.setItem).toHaveBeenCalledWith(CACHE_KEY);

    // Assert that localStorage.getItem was called
    //expect(localStorageMock).toHaveBeenCalledWith(CACHE_KEY);

    // Check first call
    //expect(localStorageMock).toHaveBeenNthCalledWith(1, CACHE_KEY, JSON.stringify({ count: 1, week: 22, year: 0 }));

    // Check last call
    //expect(localStorageMock).toHaveBeenLastCalledWith(CACHE_KEY, JSON.stringify({ count: 1, week: 22, year: 0 }));
  });

});