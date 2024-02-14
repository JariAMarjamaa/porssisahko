import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

import SecondPage from './2Page.jsx';
import ThirdPage  from './3Page.jsx';
import FourthPage from './4Page.jsx';

// Mock the callback function
const mockOnClose = jest.fn();

describe('Subpage tests', () => {
    test('pagination selection of page 2', () => {
        render(<App />);

        // Simulate a page change to 2
        fireEvent.click(screen.getByText('2'));

        // Assert that SecondPage title is rendered
        expect(screen.getByText('Toinen sivu')).toBeInTheDocument();
    });

    test('pagination selection of page 3', () => {
        render(<App />);

        // Simulate a page change to 2
        fireEvent.click(screen.getByText('3'));

        // Assert that SecondPage title is rendered
        expect(screen.getByText('Kolmas sivu')).toBeInTheDocument();
    });

    test('pagination selection of page 4', () => {
        render(<App />);

        // Simulate a page change to 2
        fireEvent.click(screen.getByText('4'));

        // Assert that SecondPage title is rendered
        expect(screen.getByText('Neljäs sivu')).toBeInTheDocument();
    });

    test('render Page 2 component', () => {
        render(<SecondPage onClose={mockOnClose} />);
        // Your assertions here
        expect(screen.getByText('Jartsan koodausnäyte')).toBeInTheDocument();

        // Trigger a click on the "Return" button
        //const returnButton = screen.getByText('Palaa takaisin pääsivulle');
        //fireEvent.click(returnButton);

        // Check if the onClose callback was called
        //expect(mockOnClose).toHaveBeenCalled();
    });

    test('render Page 3 component', () => {
        render(<ThirdPage onClose={mockOnClose} />);
        expect(screen.getByText('Kolmas sivu')).toBeInTheDocument();

        // Assert that the "Lataa CV" button is present
        const downloadButton = screen.getByText('Lataa CV');
        expect(downloadButton).toBeInTheDocument();

        // Create a spy on document.createElement to track calls
        const createElementSpy = jest.spyOn(document, 'createElement');

        // Simulate a click on the "Lataa CV" button
        fireEvent.click(downloadButton);

        //console.log("TEST. Mock calls: " ,createElementSpy.mock.calls);

        // Assert that document.createElement was called with the appropriate arguments
        expect(createElementSpy).toHaveBeenCalledWith('a'); 

        // Clean up the spy
        createElementSpy.mockRestore();
    });

    test('render Page 4 component', () => {
        console.log('Test: Start rendering');

        render(<FourthPage onClose={mockOnClose} />);
        
        console.log('Test: Component rendered');
        expect(screen.getByText('Neljäs sivu')).toBeInTheDocument();
    });
});