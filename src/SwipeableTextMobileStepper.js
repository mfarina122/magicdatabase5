import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix/lib/SwipeableViews';
import allClassesImage from '../src/AllClasses.jpg';
import barbarian from '../src/Barbarian.jpg';
import bard from '../src/Bard.jpg';
import cleric from '../src/Cleric.jpg';
import druid from '../src/Druid.jpg';
import fighter from '../src/Fighter.jpg';
import monk from '../src/Monk.jpg';
import paladin from '../src/Paladin.jpg';
import ranger from '../src/Ranger.jpg';
import sorcerer from '../src/Sorcerer.jpg';
import warlock from '../src/Warlock.jpg';
import wizard from '../src/Wizard.jpg';


const images = [
  {
    label: 'All classes',
    value:'',
    imgPath:
      allClassesImage,
  },
  {
    label: 'Bard',
    value:'bard',
    imgPath:
     bard,
  },
  {
    label: 'Cleric',
    value:'cleric',
    imgPath:
      cleric,
  },
  {
    label: 'Druid',
    value:'druid',
    imgPath:
      druid,
  },
  {
    label: 'Paladin',
    value:'paladin',
    imgPath:
      paladin,
  },
  {
    label: 'Ranger',
    value:'ranger',
    imgPath:
      ranger,
  },
  {
    label: 'Sorcerer',
    value:'sorcerer',
    imgPath:
     sorcerer,
  },
  {
    label: 'Warlock',
    value:'warlock',
    imgPath:
      warlock,
  },
  {
    label: 'Wizard',
    value:'wizard',
    imgPath:
      wizard,
  },
];

function SwipeableTextMobileStepper(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    props.changeClassValue(images[activeStep+1].value);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    props.changeClassValue(images[activeStep - 1].value);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    props.changeClassValue(images[step].value);
  };

  return (
    <Box sx={{ maxWidth: 700,marginTop:"100%" }}>
      {/*<Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>*/}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  height: 200,
                  display: 'block',
                  maxWidth: 700,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        style={{
            borderBottomRightRadius:10,
            borderBottomLeftRadius:10
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;