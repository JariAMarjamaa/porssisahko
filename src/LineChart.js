import React from 'react';
import { Paper /*, Typography*/ } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import './LineChart.css';

Chart.register(...registerables);

/*
  npm install react-chartjs-2 chart.js @material-ui/core 
	react-chartjs-2 library, build top on Chart.js
	Asentaa: react-chartjs-2, chart.js, and @material-ui/core: 
*/

const LineChart = ({ data, options }) => {

  return (
    <Paper className="paper">
      {/*<Typography variant="h6" data-testid="RFW_ChartTitle">Pörssisähkö</Typography>*/}
      <div className="chartContainer" data-testid="chart-container">
        <Line data={data} options={options} />
      </div>
    </Paper>
  );
};

export default LineChart;