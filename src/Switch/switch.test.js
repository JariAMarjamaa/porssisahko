import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChartSwitch from './switch';

describe('Switch component', () => {

  test('renders ChartSwitch component', () => {
    render(<ChartSwitch switchChanged={() => {}} />);
  });

  test('Switch text are found', () => {
    const switchChangedMock = jest.fn();
    render(<ChartSwitch switchChanged={switchChangedMock} />);

    expect(screen.getByText('Viivakäppyrä')).toBeInTheDocument();
    expect(screen.getByText('Palkkikäppyrä')).toBeInTheDocument();
  });

  test('calls switchChanged callback with updated chartType on switch change', () => {
    const switchChangedMock = jest.fn();
    const { getByTestId } = render(<ChartSwitch switchChanged={switchChangedMock} />);

    const switchElement = getByTestId('RFW_Switch').querySelector('input');
    fireEvent.click(switchElement); // Simulate switch change

    expect(switchChangedMock).toHaveBeenCalledWith('BarChartSelected');
  });

});