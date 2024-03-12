import { render, screen, fireEvent } from '@testing-library/react';
import ButtonList from './ButtonList';

describe('ButtonList component', () => {
  test('Render TOC button and dialog correctly', async () => {
    // Render the ButtonList component
    render(<ButtonList lowestPrice={10} highestPrice={20} />);

    // Test buttons
    const tocButton = screen.getByText('Sisällysluettelo');

    // Simulate button clicks
    fireEvent.click(tocButton);

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
    expect(screen.getByTestId('RFW_ButtonListDialogContent').innerHTML).toBe("- Sivu 1: Pääsivu<br>- Sivu 2: Tietoja sovelluksesta<br>- Sivu 3: CV + Robottitestaus video<br>- Sivu 4: Palautteen anto<br>- Sivu 5: ToDo - lista");
  });

  test('Render Prices info button and dialog correctly', async () => {
    // Render the ButtonList component
    render(<ButtonList lowestPrice={10} highestPrice={20} />);

    const pricesButton = screen.getByText('Hinta tiedot');
    fireEvent.click(pricesButton);
    const pricesTitle  = /Hintatiedot:/;
    expect(screen.getByText(pricesTitle)).toBeInTheDocument();

    const priceLowRegex = /Halvin hinta on 10/;
    expect(screen.getByText(priceLowRegex)).toBeInTheDocument();

    const priceHighRegex = /Korkein hinta on 20/;
    expect(screen.getByText(priceHighRegex)).toBeInTheDocument();
  });

  test('Render Calendar info button and dialog correctly', async () => {
    render(<ButtonList lowestPrice={10} highestPrice={20} />);
    const calendarButton = screen.getByText('Kalenterin ohje');
    fireEvent.click(calendarButton);

    const calendarContentline1Regex = /Valitse päivä, josta taaksepäin haluat 7 päivältä hinta tiedot/;
    expect(screen.getByText(calendarContentline1Regex)).toBeInTheDocument();

    const calendarContentLine2Regex = /Vain max. 2 hakua viikossa/;
    expect(screen.getByText(calendarContentLine2Regex )).toBeInTheDocument();
  });

  test('Render API test info button and dialog correctly', async () => {
    // Create a mock function for the simulationCallback
    const mockSimulationCallback = jest.fn();

    render(<ButtonList lowestPrice={10} highestPrice={20} simulationCallback={mockSimulationCallback}/>);
    const apiButton = screen.getByText('Simuloi sähkökatko!');
    fireEvent.click(apiButton);

    // Check that the simulationCallback was called once
    expect(mockSimulationCallback).toHaveBeenCalledTimes(1);
  });
});