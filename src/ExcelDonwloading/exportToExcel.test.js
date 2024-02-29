import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExcelDownload from './exportToExcel.jsx';
import * as fileSaver from 'file-saver'; // Import the entire file-saver library

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));

describe('Excel exporting component', () => {

  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeEach(() => {
    // Reset mock between tests
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    
    // Override the actual localStorage methods
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });
  
  test('renders Excel exporting', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ data: [
      { aikaleima_suomi: '2020-02-26T06:00', hinta: 5.201 },
      { aikaleima_suomi: '2020-02-26T12:59', hinta: 6.201 },
      { aikaleima_suomi: '2020-02-26T18:59', hinta: 7.201 },
      { aikaleima_suomi: '2020-02-26T23:59', hinta: 8.201 }]}));
   
    render(<ExcelDownload />);

    // Regular expressions for flexible text matching
    const Title = /Lataa sähkökäppyrä Exceliin/;
    expect(screen.getByText(Title)).toBeInTheDocument();
    expect(screen.getByText("Eka")).toBeInTheDocument();
    expect(screen.getAllByText("26.02.2020")[0]).toBeInTheDocument();
    expect(screen.getByText("Klo: 06")).toBeInTheDocument();
    expect(screen.getByText("5.201")).toBeInTheDocument();
  });

  test('should trigger saveExcel function on button click', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ data: [
      { aikaleima_suomi: '2024-02-26T06:00', hinta: 5.201 },
      { aikaleima_suomi: '2024-02-26T12:59', hinta: 6.201 },
      { aikaleima_suomi: '2024-02-26T18:59', hinta: 7.201 },
      { aikaleima_suomi: '2024-02-26T23:59', hinta: 8.201 }]}));

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