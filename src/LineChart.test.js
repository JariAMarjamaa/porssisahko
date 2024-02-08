import React from 'react';
import { render } from '@testing-library/react';
import LineChart from './LineChart';
import { mockChartData, mockChartOptions } from "./mockData/Chart.mock";

// Mock the Line component
jest.mock('react-chartjs-2', () => ({
    Line: jest.fn(() => null), 
  }));
  
describe('LineChart tests', () => {

    test('renders LineChart without crashing', () => {
        render(<LineChart data={mockChartData} options={mockChartOptions} />);
    });

    test('renders Typography with correct text', () => {
        const { getByText } = render(<LineChart data={{}} options={{}} />);
        expect(getByText('Pörssisähkö')).toBeInTheDocument();
    });

    test('renders chartContainer with correct styles', () => {
        const { getByTestId } = render(<LineChart data={{}} options={{}} />);
        const chartContainer = getByTestId('chart-container');
        expect(chartContainer).toHaveStyle('width: 1300px;');
        expect(chartContainer).toHaveStyle('height: 700px;');
    });
});