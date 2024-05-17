import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { Autocomplete, Backdrop, Box, Button, CircularProgress, Select, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { getAllSpells } from './api';
import { StyledTextfield } from './StyledTextfield';
import MagicModal from './MagicModal';
import magoPhoto from '../src/mago.jpg';

const styles = {
    sectioncontainer: {
        border: '1px solid transparent',
        borderRadius: '6px',
        marginBottom: '10px',
        paddingBottom: '10px',
        height:'100vh',
        //background: "linear-gradient(0deg,  rgba(242,242,242,0) 100%,rgba(242,242,242,1) 27%)",
        //backdropFilter: "blur(16px)"
    },
    fieldscontainer: {
        marginTop: '10px',
        marginBottom: '10px',
        padding: '10px'
    },
    textfield: {
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '12px',
        width: '250px'
    }
}

const theme = createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            borderColor: 'white', 
          },
          input: {
            borderColor: 'white',
            color: 'white',
          },
        },
      },
    },
  });

export default function MainComponent() {
    const [magics,setMagics] = useState([]);
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const [selectedSpellURL,setselectedSpellURL] = useState(null);

    useEffect(() => {
        setLoading(true);
        getAllSpells().then((spells) => {
            setMagics(spells.results.sort((a,b) => a.level - b.level));
            setLoading(false);
        }).catch((error) => {
            alert("Caricamento fallito");
        })
    },[]);

    useEffect(() => {
        if(selectedSpellURL !== null)
        setOpen(true);
    },[selectedSpellURL])

    const handleClose = () => {
        setLoading(false);
      };
    
    const handleModalClose = (e) => {
        setOpen(false);
    }
    const handleOpenModal = (e) => {
        if(e !== null)
        setselectedSpellURL(e.url);
    }

    return <div style={{
        textAlign: 'center',
        color: 'black',
        padding: '26px',
        backgroundImage: "url("+magoPhoto+")",
        backgroundSize:"cover",
        height:'100vh',
    }} >
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
    <Container style={{ maxWidth: '700px' }}>
                                            <Grid container justify="center" alignItems="center">
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={styles.sectioncontainer}>
                                                {/*<Select style={{marginBottom:'5%'}} variant='outlined'>

                                                </Select>*/}
                                                <ThemeProvider theme={theme}>
    <Autocomplete id="magic"
      sx={{ width: '100%' }}
      options={magics}
      autoHighlight
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => {
        if(event.target.value !== '')
        handleOpenModal(newValue)
      }}
      renderOption={(props, option) => (
        <Box 
        component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {"Spell name: "+option.name}
          <br></br>
          {option.level === 0 ? "Cantrip" : "Level: "+option.level}
        </Box>
      )}
      renderInput={(params) => (
        <StyledTextfield
          {...params}
          label="Find your spell here"
          /*inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}*/
        />
      )}>

      </Autocomplete>
      </ThemeProvider>
                </Grid>
            </Grid>
           {open ? <MagicModal open={open} spellURL={selectedSpellURL} onClose={handleModalClose}></MagicModal> : null}
        </Container>
    </div>
}