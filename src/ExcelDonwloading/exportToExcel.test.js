import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExcelDownload from './exportToExcel.jsx';
import * as fileSaver from 'file-saver'; // Import the entire file-saver library

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));


fdescribe('Excel exporting component', () => {
  
  test('renders Excel exporting', () => {
    // Mock the localStorage methods
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    
    // Override the actual localStorage methods
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    
    // Mock the initial state
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ data: [
      { aikaleima_suomi: '2020-02-26T06:00', hinta: 5.201 },
      { aikaleima_suomi: '2020-02-26T12:59', hinta: 6.201 },
      { aikaleima_suomi: '2020-02-26T18:59', hinta: 7.201 },
      { aikaleima_suomi: '2020-02-26T23:59', hinta: 8.201 }
    ] }));
    
    render(<ExcelDownload />);

    // Regular expressions for flexible text matching
    const Title = /Lataa sähkökäppyrä Exceliin/;
    expect(screen.getByText(Title)).toBeInTheDocument();
    expect(screen.getByText("Eka")).toBeInTheDocument();
    expect(screen.getAllByText("26.02.2020")[0]).toBeInTheDocument();
    expect(screen.getByText("Klo: 06")).toBeInTheDocument();
    expect(screen.getByText("5.201")).toBeInTheDocument();

    // Reset mock between tests
    //localStorageMock.getItem.mockReset();
    //localStorageMock.setItem.mockReset();
  });

  xtest('should trigger saveExcel function on button click', async () => {
    // Mock the localStorage methods
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    
    // Override the actual localStorage methods
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    
    // Mock the initial state
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ data: [
      { aikaleima_suomi: '2023-02-26T06:00', hinta: 5.201 },
      { aikaleima_suomi: '2023-02-26T12:59', hinta: 6.201 },
      { aikaleima_suomi: '2023-02-26T18:59', hinta: 7.201 },
      { aikaleima_suomi: '2023-02-26T23:59', hinta: 8.201 }
    ] }));

    // Spy on the saveAs method
    const saveAsSpy = jest.spyOn(fileSaver, 'saveAs');

    const { getByTestId } = render(<ExcelDownload />);

    // Act
    fireEvent.change(getByTestId('RFW_ExcelFileName'), { target: { value: 'MyFile' } });

    await act(async () => {
      fireEvent.click(getByTestId('RFW_ExcelDownloadButton'));
    });

    // Assert
    await waitFor(() => {
      expect(saveAsSpy).toHaveBeenCalledTimes(1);
    });

    // Clean up
    saveAsSpy.mockRestore(); // Restore the original saveAs method
  });

});