//import { renderHook, act, waitFor } from '@testing-library/react'
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendar from './calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import MockDate from 'mockdate';

// npm install --save-dev mockdate
//npm install --save-dev @testing-library/react@latest
fdescribe('Calendar component', () => {

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

  // Count user made reguests
  const CACHE_KEY = 'userReguests';
  

  dayjs.locale('fi');
  // Set a specific date for testing
  const mockDate = new Date('2023-05-31');
  //const mockDate = new Date('2023-05-31T00:00:00.000');
  mockDate.setDate(mockDate.getDate() /*- 1*/); 

  console.log("TEST. mockDate: ", mockDate);

  beforeEach(() => {
    MockDate.set(mockDate);
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

 xtest('Just OK click returns null as selected date', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({ count: 0, week: 0, year: 0 }));

    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    // Simulate Calendar opening data-testid="CalendarIcon"
    const CalendarElement = screen.getByTestId('CalendarIcon'); // RFW_CalendarTitle
    fireEvent.click(CalendarElement);
    
    const OkButton = screen.getByText('OK');
    fireEvent.click(OkButton);

    expect(mockhandleSelectedDate).toHaveBeenCalledTimes(1);
    expect(mockhandleSelectedDate).toHaveBeenCalledWith(null);
  });

  xtest('Day selection button is found', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({ count: 0, week: 0, year: 0 }));

    render(<Calendar dateSelected={mockhandleSelectedDate} UpdateChart={mockUpdateChart} />);
    
    // Simulate Calendar opening data-testid="CalendarIcon"
    const CalendarElement = screen.getByTestId('CalendarIcon'); // RFW_CalendarTitle
    fireEvent.click(CalendarElement);
    // screen.debug(CalendarElement);

    const chosenDate = screen.getByRole('gridcell', { name: "15"}); // choose any date that the calender shows
    expect(chosenDate).toBeInTheDocument();
    fireEvent.click(chosenDate);
  });

  test('OK+Search returns selected date', () => {
    const mockUpdateChart = jest.fn();
    const mockhandleSelectedDate = jest.fn(); //(date: Date) => {

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify({ count: 0, week: 0, year: 0 }));

    const cacheDate = localStorage.getItem(CACHE_KEY);
    console.log("TEST. cacheDate: ", cacheDate);

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

    screen.debug(searchButton);

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

});