import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const CustomSizeSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-thumb': {
      width: 24, // Adjust the width of the thumb
      height: 24, // Adjust the height of the thumb
      transform: 'translateX(-6px)', // Adjust the horizontal position of the thumb
    },
    '& .MuiSwitch-track': {
      borderRadius: 16, // Adjust the border-radius of the track
    },
  }));
  
  
export default function ChartSwitch({switchChanged}) {
    const [chartType, setChartType] = React.useState('LineChartSelected');

    const handleSwitchChange = () => {
        console.log('ChartSwitch. handleSwitchChange triggered');

        const updatedChartType = chartType === 'LineChartSelected' ? 'BarChartSelected' : 'LineChartSelected';
        setChartType(updatedChartType);
        console.log('ChartSwitch. handleSwitchChange. chartType:', updatedChartType);
        switchChanged(updatedChartType);
    };
    
    return (
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Viivakäppyrä</Typography>
          <CustomSizeSwitch onChange={handleSwitchChange} data-testid="RFW_Switch"/>
          <Typography>Palkkikäppyrä</Typography>
        </Stack>
      </FormGroup>
    );
  }