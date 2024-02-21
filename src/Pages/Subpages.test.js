import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';

import SecondPage from './2Page.tsx';
import ThirdPage  from './3Page.jsx';
import FourthPage from './4Page.jsx';

// Mock the callback function
const mockOnClose = jest.fn();

describe('Subpage tests', () => {
    test('pagination selection of page 2', async () => {
        await act(async () => {
            render(<App />);
        });

        // Simulate a page change to 2
        fireEvent.click(screen.getByText('2'));

        // Assert that SecondPage title is rendered
        expect(screen.getByText('Jartsan koodausnäyte')).toBeInTheDocument();
    });

    test('pagination selection of page 3', async () => {
        await act(async () => {
            render(<App />);
        });

        // Simulate a page change to 2
        fireEvent.click(screen.getByText('3'));

        // Assert that SecondPage title is rendered
        expect(screen.getByText('Kolmas sivu')).toBeInTheDocument();
    });

    test('pagination selection of page 4', async () => {
        await act(async () => {
            render(<App />);
        });

        // Simulate a page change to 2
        fireEvent.click(screen.getByText('4'));

        // Assert that SecondPage title is rendered
        expect(screen.getByText('Neljäs sivu')).toBeInTheDocument();
    });

    test('render Page 2 component', () => {
        const mockAccordionOpen = jest.fn();
        render(<SecondPage  onOpen={mockAccordionOpen} />);
        
        expect(screen.getByText('React DemoApp')).toBeInTheDocument();
        expect(screen.getByText('UI työkalut')).toBeInTheDocument();

        // Simulate expanding an Accordion
        const accordionPanel = screen.getByText('UI työkalut');
        fireEvent.click(accordionPanel);

        // Assertions for the accordion content
        //const ReactTextRegex      = /React/;  <= react sana löytyy monesta kohtaa DOM:a
        const MaterialUITextRegex = /MaterialUI/;
        //expect(screen.getByText(ReactTextRegex)).toBeInTheDocument();
        expect(screen.getByText(MaterialUITextRegex)).toBeInTheDocument();
;

        // Verify that onOpen callback is called with true when expanded
        expect(mockAccordionOpen).toHaveBeenCalledWith(true);

        // Simulate collapsing the Accordion
        fireEvent.click(accordionPanel);

        // Your additional assertions related to the collapsed state can go here

        // Verify that onOpen callback is called with false when collapsed
        expect(mockAccordionOpen).toHaveBeenCalledWith(false);
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

        // Assert that document.createElement was called with the appropriate arguments
        expect(createElementSpy).toHaveBeenCalledWith('a'); 

        // Clean up the spy
        createElementSpy.mockRestore();
    });

    test('render Page 4 component', () => {
        render(<FourthPage />);
        expect(screen.getByText('Neljäs sivu')).toBeInTheDocument();

        // Assert that the "Katso video Robottitestauksesta" button is present
        const videoButton = screen.getByText('Katso video Robottitestauksesta');
        expect(videoButton).toBeInTheDocument();

        // Create a spy on document.createElement to track calls
        const createElementSpy = jest.spyOn(document, 'createElement');

        // Simulate a click on the "Open video" button
        fireEvent.click(videoButton);

        //console.log("TEST: createElementSpy: ", createElementSpy);
        // Assert that document.createElement was called with the appropriate arguments
        expect(createElementSpy).toHaveBeenCalledWith('iframe'); 
        expect(createElementSpy).toHaveBeenCalledWith('br'); 
        expect(createElementSpy).toHaveBeenCalledWith('button'); 
        
        expect(createElementSpy).toHaveBeenCalledTimes(5);     
       
        // Clean up the spy
        createElementSpy.mockRestore();
    });
});