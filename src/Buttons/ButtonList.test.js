import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ButtonList from './ButtonList';
import {useStateValue} from "../State/index.js";
import { mockStoreInitialState } from "../mockData/store.mock.jsx";

var mockState = mockStoreInitialState;
mockState.login.state = "LOGIN_SUCCEEDED";

// Mock the StateProvider component
jest.mock('../State', () => ({
  __esModule: true,
  StateProvider: ({ reducer, mockStoreInitialState, children }) => (
    <div>
      {children}
    </div>
  ),
  useStateValue: jest.fn(),
}));

// Create a mock function for the simulationCallback
const mockSimulationCallback = jest.fn();

describe('ButtonList component', () => {
  test('Render TOC button and dialog correctly', () => {
    useStateValue.mockReturnValue({
      state: mockState,  /* mock state here */ 
      dispatch: jest.fn(),
      actions: { /* mock actions here */ },
    });
    
    const { getByText } = render(<ButtonList lowestPrice="10" highestPrice="20" simulationCallback={mockSimulationCallback}/>);

    const tocButton = getByText('Sisällysluettelo');
    fireEvent.click(tocButton);

    waitFor(() => {
      act(() => {
        // Check that dialog is rendered correctly
        // Regular expressions for flexible text matching
        // First the dialog title
        const tocTitle  = /Sisältöluettelo:/;
        expect(getByText(tocTitle)).toBeInTheDocument();

        // Check that dialog content is rendered correctly
        const tocContentRegex = /Sivu 1: Pääsivu/;
        expect(screen.getByText(tocContentRegex)).toBeInTheDocument();

        // Alternatively, lets compare the whole rendered content
        expect(screen.getByTestId('RFW_ButtonListDialogContent')).toBeInTheDocument();
        expect(screen.getByTestId('RFW_ButtonListDialogContent').innerHTML).toBe("- Sivu 1: Pääsivu<br>- Sivu 2: Tietoja sovelluksesta<br>- Sivu 3: CV + Robottitestaus video<br>- Sivu 4: Palautteen anto<br>- Sivu 5: SW documentointi<br>- Sivu 6: ToDo - lista");
      });
    });
  });

  test('Render Prices info button and dialog correctly', () => {
    useStateValue.mockReturnValue({
      state: mockState,  /* mock state here */ 
      dispatch: jest.fn(),
      actions: { /* mock actions here */ },
    });
    
    const { getByText } = render(<ButtonList lowestPrice="10" highestPrice="20" simulationCallback={mockSimulationCallback}/>);

    const pricesButton = getByText('Hinta tiedot');
    fireEvent.click(pricesButton);
    
    waitFor(() => {
      act(() => {
        const pricesTitle  = /Hintatiedot:/;
        expect(getByText(pricesTitle)).toBeInTheDocument();
          
        const priceLowRegex = /Halvin hinta on 1/;
        expect(getByText(priceLowRegex)).toBeInTheDocument();
          
        const priceHighRegex = /Korkein hinta on 100/;
        expect(getByText(priceHighRegex)).toBeInTheDocument();
      });
    });
  });

  test('Render Calendar info button and dialog correctly', () => {
    useStateValue.mockReturnValue({
      state: mockState,  /* mock state here */ 
      dispatch: jest.fn(),
      actions: { triggerShowCalendarInfo: jest.fn() },
    });
    
    const { getByText } = render(<ButtonList lowestPrice="10" highestPrice="20" simulationCallback={mockSimulationCallback}/>);

    const calendarButton = getByText('Kalenterin ohje');
    fireEvent.click(calendarButton);

    // Assert that the triggerShowCalendarInfo action was called
    expect(useStateValue().actions.triggerShowCalendarInfo).toHaveBeenCalled();

  });

  test('Make API test callback correctly', () => {
    // Set up the mock implementation for asyncFetchPrice
    //apiModule.asyncFetchPorssisahkoNet.mockResolvedValue(mockTestPrices);
    //<ButtonList lowestPrice={lowestValue} highestPrice={highestValue} simulationCallback={mockSimulationCallback} ></ButtonList>
    useStateValue.mockReturnValue({
      state: mockState,  /* mock state here */ 
      dispatch: jest.fn(),
      actions: { /* mock actions here */ },
    });

    const { getByText } = render(<ButtonList lowestPrice="10" highestPrice="20" simulationCallback={mockSimulationCallback}/>);

    // Assert that the button list is rendered
    expect(getByText('Simuloi sähkökatko!')).toBeInTheDocument();
    
    const buttonText  = /Simuloi sähkökatko!/;
    const apiButton = screen.getByText(buttonText);
    fireEvent.click(apiButton);

    expect(mockSimulationCallback).toHaveBeenCalledTimes(1);

  });
});