import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SecondPage = ({ onOpen }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      console.log("handleChange. isExpanded: ", isExpanded);
      onOpen(isExpanded ? true : false);
    };

  return (
    <div className="new-page-modal">
        <div>Jartsan koodausnäyte</div>
        <div>React DemoApp</div> 
        <div>Kaikenlaisilla hienoilla kikkuloilla.</div> 

        <div  className={`listing ${expanded === 'panel1' ? 'extra-padding' : ''}`}>
        <br/>
        <br/>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
            <Typography sx={{ width: '33%', flexShrink: 0 }}> UI työkalut </Typography>
            <Typography sx={{ color: 'text.secondary' }}></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ bgcolor: 'lightgray' }}>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}> Testaus työkalut</Typography>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}> Tuotantoon deploymentti </Typography>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}> Versio historia </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ bgcolor: 'lightgray' }}>
              Viimeisimpänä isompana juttuna lisätty proxy serveri.
              <br/>
              <br/>
              Jotta oikeaa hintadataa voidaan ladata.
              <br/>
              <br/>
              Lisäksi ulkoasua viilattu ja lisätty nämä avattavat osiot.
              <br/>
              <br/>
              Sovellus versio 4.0
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>

        {/*<button className="button" onClick={onClose}>Palaa takaisin pääsivulle</button>*/}
      </div>
    );
};

export default SecondPage;