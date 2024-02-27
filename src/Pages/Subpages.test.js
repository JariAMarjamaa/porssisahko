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

    test('render Page 2 component',  async () => {
        //const mockAccordionOpen = jest.fn();
        //accordion open callback removed
        //render(<SecondPage  onOpen={mockAccordionOpen} />);
        render(<SecondPage />);

        expect(screen.getByText('React DemoApp')).toBeInTheDocument();
        expect(screen.getByText('UI työkalut')).toBeInTheDocument();
        // wholly component is seen from DOM, so just check that test-id is found also
        expect(screen.getByTestId('RFW_AccordionContent_1')).toBeInTheDocument();
        //const ReactTextRegex      = /React/;  <= react word is found multiple places from the DOM, so use unigue text
        const MaterialUITextRegex = /MaterialUI/;
        expect(screen.getByText(MaterialUITextRegex)).toBeInTheDocument();

        // Simulate expanding an Accordion
        const accordionPanel = screen.getByText('UI työkalut');
        fireEvent.click(accordionPanel);
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
        expect(screen.getByText('Robottitestaus:')).toBeInTheDocument();
        const videoButton = screen.getByText('Katso video');
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