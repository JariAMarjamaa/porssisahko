import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Pages.css';

const SecondPage = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="new-page-modal">
        <div>Jartsan koodausnäyte</div>
        <div>React DemoApp</div> 
        <div>Kaikenlaisilla hienoilla kikkuloilla.</div> 

        <div className={`listing ${expanded === 'panel1' ? 'extra-padding' : ''}`}>
        <br/>
        <br/>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={`${expanded === 'panel4' ? 'hidden' : ''}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Typography sx={{ width: '70%', flexShrink: 0 }} data-testid="RFW_AccordionContent_1"> UI työkalut </Typography>
            <Typography sx={{ color: 'text.secondary' }}></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ bgcolor: 'lightgray' }} >
                React
                <br/>
                <br/>
                MaterialUI
            </Typography>
          </AccordionDetails>
        </Accordion>
      
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header">
            <Typography sx={{ width: '70%', flexShrink: 0 }}> Testaus työkalut</Typography>
            <Typography sx={{ color: 'text.secondary' }}></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ bgcolor: 'lightgray' }}>
              Jest
              <br/>
              <br/>
              Robot Framework
            </Typography>
          </AccordionDetails>
        </Accordion>
            
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header">
            <Typography sx={{ width: '70%', flexShrink: 0 }}> Tuotantoon deploymentti </Typography>
            <Typography sx={{ color: 'text.secondary' }}></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ bgcolor: 'lightgray' }}>
              GitHub
              <br/>
              <br/>
              Vercel
            </Typography>
          </AccordionDetails>
        </Accordion>
            
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header">
            <Typography sx={{ width: '70%', flexShrink: 0 }}> Versio historia </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ bgcolor: 'lightgray' }}>
              Viimeisimpänä isompana juttuna lisätty proxy serveri.
              <br/>
              Pääsivulle kalenteri, hinta haun valintaan.
              <br/>
              <br/>
              Ja nyt Excel lataus mahdollisuus
              <br/>
              <br/>
              <br/>
              - Käytetään vielä testi dataa
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              Sovellus versio 6.0
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>

        {/*<button className="button" onClick={onClose}>Palaa takaisin pääsivulle</button>*/}
      </div>
    );
};

export default SecondPage;