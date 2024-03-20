import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import App from '../App.jsx';

import SecondPage from './2Page.tsx';
import ThirdPage  from './3Page.jsx';

import { Provider } from 'react-redux';
import { StateProvider } from '../State';
import mainReducer from "../store/reducers/index.js";
import { mockStoreInitialState } from "../mockData/store.mock.jsx";
import { mockTestPrices} from "../mockData/Price-test.mock.jsx";
import configureMockStore        from 'redux-mock-store';

import * as apiModule from '../api';

const mockStore = configureMockStore([]);
// Create a mock store with the initial state
//const store = mockStore(mockStoreInitialState);
var mockState = mockStoreInitialState;
mockState.login.state = "LOGIN_SUCCEEDED";
// Create a mock store with the initial state
const store = mockStore(mockState);

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
  
describe('Subpage tests', () => {
    test('pagination selection of page 2', async () => {

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
            fireEvent.click(screen.getByText('2'));
        });
      
        // Wait for the asynchronous operations to complete
        await waitFor(() => {
            act(() => {
                // Assert that SecondPage title is rendered
                expect(screen.getByText('Jartsan koodausnäyte')).toBeInTheDocument();
            });
        });
    });

    test('pagination selection of page 3', async () => {
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
            fireEvent.click(screen.getByText('3'));
        });
      
        await waitFor(() => {
            act(() => {
                expect(screen.getByText('Kolmas sivu')).toBeInTheDocument();
            });
        });
    });

    test('pagination selection of page 4',  async () => {
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
            fireEvent.click(screen.getByText('4'));
        });
      
        await waitFor(() => {
            act(() => {
                expect(screen.getByText('Neljäs sivu')).toBeInTheDocument();
            });
        });
    });

    test('render Page 2 component',  () => {
        render(<SecondPage />);

        expect(screen.getByText('React DemoApp')).toBeInTheDocument();
        expect(screen.getByText('UI+Backend työkalut')).toBeInTheDocument();
        // wholly component is seen from DOM, so just check that test-id is found also
        expect(screen.getByTestId('RFW_AccordionContent_1')).toBeInTheDocument();
        //const ReactTextRegex      = /React/;  <= react word is found multiple places from the DOM, so use unigue text
        const MaterialUITextRegex = /MaterialUI/;
        expect(screen.getByText(MaterialUITextRegex)).toBeInTheDocument();

        // Simulate expanding an Accordion
        //const accordionPanel = screen.getByText('UI työkalut');
        //fireEvent.click(accordionPanel);
    });

    test('render Page 3 component', () => {
        render(<ThirdPage/>);
        expect(screen.getByText('Kolmas sivu')).toBeInTheDocument();

        // Assert that the "Lataa CV" button is present
        const downloadButton = screen.getByText('Lataa CV');
        expect(downloadButton).toBeInTheDocument();

        // Create a spy on document.createElement to track calls
        const createElementSpy = jest.spyOn(document, 'createElement');

        // Simulate a click on the "Lataa CV" button
        fireEvent.click(downloadButton);

        // Assert that document.createElement was called with the appropriate arguments
        expect(createElementSpy).toHaveBeenCalledWith('a'); 

        // Clean up the spy
        createElementSpy.mockRestore();
    });

    xtest('render Page 3 component with video', () => {
        render(<ThirdPage/>);

        // Assert that the "Katso video Robottitestauksesta" button is present
        expect(screen.getByText('Robottitestaus:')).toBeInTheDocument();
        const videoButton = screen.getByText('Katso video');
        expect(videoButton).toBeInTheDocument();

        // Create a spy on document.createElement to track calls
        const createElementSpy = jest.spyOn(document, 'createElement');

        // Simulate a click on the "Open video" button
        fireEvent.click(videoButton);

        // Assert that document.createElement was called with the appropriate arguments
        expect(createElementSpy).toHaveBeenCalledWith('iframe'); 
        expect(createElementSpy).toHaveBeenCalledWith('br'); 
        expect(createElementSpy).toHaveBeenCalledWith('button'); 
        
        expect(createElementSpy).toHaveBeenCalledTimes(5);     
       
        // Clean up the spy
        createElementSpy.mockRestore();
    });
});