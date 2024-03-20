import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ButtonList from './ButtonList';
import App from '../App.jsx';

import { Provider } from 'react-redux';
import { StateProvider } from '../State';
import mainReducer from "../store/reducers/index.js";

import configureMockStore from 'redux-mock-store';
import { mockStoreInitialState } from "../mockData/store.mock.jsx";
import { mockTestPrices} from "../mockData/Price-test.mock.jsx";

import * as apiModule from '../api';
// Mock the asyncFetchPorssisahkoNet function / asyncFetchPrice
jest.mock('../api', () => ({
  ...jest.requireActual('../api'), // Use the actual implementation for other functions in api module
  //asyncFetchPrice: jest.fn(), // muista laittaa const hinnat = await asyncFetchPrice(); päälle ElectricityPrice.jsx filessä
  asyncFetchPorssisahkoNet: jest.fn(), // muista laittaa const hinnat = await asyncFetchPorssisahkoNet(); päälle ElectricityPrice.jsx filessä
}));

// Mock the Line component
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => null), 
}));

const mockStore = configureMockStore([]);
var mockState = mockStoreInitialState;
mockState.login.state = "LOGIN_SUCCEEDED";
// Create a mock store with the initial state
const store = mockStore(mockState);

// Create a mock function for the simulationCallback
const mockSimulationCallback = jest.fn();

describe('ButtonList component', () => {
  test('Render TOC button and dialog correctly', async () => {
      // Set up the mock implementation for asyncFetchPrice
      apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
      await act(async () => {
          render(
            <Provider store={store}>
              <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
              <App />
              </StateProvider>
            </Provider>
          );
        });

      await act(async () => {
          // Simulate a page change to 2
          fireEvent.click(screen.getByText("Näytä nappulat"));
      });

      await act(async () => {
        // Test buttons
        const tocButton = screen.getByText('Sisällysluettelo');
        // Simulate button clicks
        fireEvent.click(tocButton);
      });


      // Wait for the asynchronous operations to complete
      await waitFor(() => {
        act(() => {
          // Check that dialog is rendered correctly
          // Regular expressions for flexible text matching
          // First the dialog title
          const tocTitle  = /Sisältöluettelo:/;
          expect(screen.getByText(tocTitle)).toBeInTheDocument();

          // Check that dialog content is rendered correctly
          const tocContentRegex = /Sivu 1: Pääsivu/;
          expect(screen.getByText(tocContentRegex)).toBeInTheDocument();

          // Alternatively, lets compare the whole rendered content
          expect(screen.getByTestId('RFW_ButtonListDialogContent')).toBeInTheDocument();
          expect(screen.getByTestId('RFW_ButtonListDialogContent').innerHTML).toBe("- Sivu 1: Pääsivu<br>- Sivu 2: Tietoja sovelluksesta<br>- Sivu 3: CV + Robottitestaus video<br>- Sivu 4: Palautteen anto<br>- Sivu 5: SW documentointi<br>- Sivu 6: ToDo - lista");
        });
      });
  });

  test('Render Prices info button and dialog correctly', async () => {
      // Set up the mock implementation for asyncFetchPrice
      apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
      await act(async () => {
          render(
            <Provider store={store}>
              <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
              <App />
              </StateProvider>
            </Provider>
          );
        });

      await act(async () => {
          // Simulate a page change to 2
          fireEvent.click(screen.getByText("Näytä nappulat"));
      });

      await act(async () => {
        const pricesButton = screen.getByText('Hinta tiedot');
        fireEvent.click(pricesButton);
      });

      // Wait for the asynchronous operations to complete
      //await waitFor(() => {
        act(() => {
          const pricesTitle  = /Hintatiedot:/;
          expect(screen.getByText(pricesTitle)).toBeInTheDocument();
      
          const priceLowRegex = /Halvin hinta on 1/;
          expect(screen.getByText(priceLowRegex)).toBeInTheDocument();
      
          const priceHighRegex = /Korkein hinta on 100/;
          expect(screen.getByText(priceHighRegex)).toBeInTheDocument();
        });
      //});
  });

  test('Render Calendar info button and dialog correctly', async () => {
    // Set up the mock implementation for asyncFetchPrice
    apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
    await act(async () => {
        render(
          <Provider store={store}>
            <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
            <App />
            </StateProvider>
          </Provider>
        );
      });

    await act(async () => {
        // Simulate a page change to 2
        fireEvent.click(screen.getByText("Näytä nappulat"));
    });

    await act(async () => {
      const calendarButton = screen.getByText('Kalenterin ohje');
      fireEvent.click(calendarButton);
    });

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      act(() => {
        const calendarContentline1Regex = /Valitse päivä, josta taaksepäin haluat 7 päivältä hinta tiedot/;
        expect(screen.getByText(calendarContentline1Regex)).toBeInTheDocument();
    
        const calendarContentLine2Regex = /Vain max. 2 hakua viikossa/;
        expect(screen.getByText(calendarContentLine2Regex )).toBeInTheDocument();
      });
    });
  });

  xtest('Render API test info button and dialog correctly', async () => {
    // Set up the mock implementation for asyncFetchPrice
    apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
    //<ButtonList lowestPrice={lowestValue} highestPrice={highestValue} simulationCallback={mockSimulationCallback} ></ButtonList>

    await act(async () => {
        render(
          <Provider store={store}>
            <StateProvider reducer={mainReducer} initialState={mockStoreInitialState}>
            <App />
            </StateProvider>
          </Provider>
        );
      });

    await act(async () => {
        // Simulate a page change to 2
        fireEvent.click(screen.getByText("Näytä nappulat"));
    });

    await act(async () => {
      const apiButton = screen.getByText('Simuloi sähkökatko!');
      fireEvent.click(apiButton);
    });

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      act(() => {
        // Check that the simulationCallback was called once
        expect(mockSimulationCallback).toHaveBeenCalledTimes(1);
      });
    });
  });
});