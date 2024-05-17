import { Backdrop, Button, CircularProgress, Container, IconButton, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getASpellInformation } from "./api";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ArrowRightAlt, Class, FlareOutlined, HourglassBottom, Inventory } from "@mui/icons-material";

const styles = {
    modalcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        borderRadius:10,
        //paddingTop: '6px',
        //paddingBottom: '6px',
        //paddingLeft: '10px',
        //paddingRight: '10px',
        marginTop: '26px',
        marginBottom: '26px',
        marginLeft: '5%',
        marginRight: '5%',
        overflowY: 'scroll',
        //height: 'fit-content',
        maxWidth: '100%',
    },
    title: {
        paddingTop: '20px',
        paddingBottom: '20px'
    }
}
export default function MagicModal(props) {
    const [spellInformation,setSpellInformation] = useState({});
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if(props.open){
            if(props.spellURL !== null){
            getASpellInformation(props.spellURL).then((spellInformation) => {
                setSpellInformation(spellInformation);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
            }
        }
    },[props.open])
    return(<Modal
        open={props.open}
        onClose={props.onClose}
        style={{overflowY:'scroll'}}
    >
         <div style={styles.modalcontainer}>
               {loading ? 
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
               : 
               Object.keys(spellInformation).length > 0 ? <Container style={{overflow:'auto'}}>
                    <Typography style={{paddingTop:10}} variant="h4">{spellInformation.name}</Typography>
                    <Typography variant="h6" style={{paddingTop:10,paddingBottom:10 }}>{spellInformation.level > 0 ? 'Level : '+spellInformation.level : 'Cantrip'}</Typography>
                    <Typography variant="h6" style={{paddingBottom:10}}>{'Magic School : '+spellInformation.school.name}</Typography>
                    <Typography variant="h6" style={{paddingBottom:10 }}>{'Description'}</Typography>
                    <div style={{overflowY:'scroll',height:"150px",border:'#e0e0e0 1px solid',borderRadius:10,padding:10}}>
                    <Typography style={{paddingTop:'0%',textAlign:"left",fontSize:'0.8em'}}>{spellInformation.desc}</Typography>
                    <Typography style={{paddingBottom:'0%',textAlign:"left",fontSize:'0.8em'}}>{spellInformation.higher_level}</Typography>
                    </div>
                    
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingTop:10,marginBottom:10}}>
                    {spellInformation.components !== undefined && spellInformation.components.some((item) => item === 'V') ? <Typography style={{backgroundColor:"#aedbf0",padding:5,borderRadius:10}}>{'View'}</Typography> : null}
                    {spellInformation.components !== undefined && spellInformation.components.some((item) => item === 'S') ? <Typography style={{backgroundColor:"#aedbf0",padding:5,borderRadius:10}}>{'Speech'}</Typography> : null}
                    {spellInformation.components !== undefined && spellInformation.components.some((item) => item === 'M') ? <Typography style={{backgroundColor:"#aedbf0",padding:5,borderRadius:10}}>{'Materials'}</Typography> : null}
                    </div>
                    <div style={spellInformation.material !== undefined ? {height:180,overflow:'scroll',border:'#e0e0e0 1px solid',borderRadius:10,padding:10} : {height:180,overflow:'scroll',border:'#e0e0e0 1px solid',borderRadius:10,padding:10}}>
                    <div style={{display:"flex",flexDirection:'row'}}>
                    <HourglassBottom></HourglassBottom>
                    {<Typography style={{paddingBottom:10,marginLeft:5,textAlign:"left"}}>{'Duration: '+spellInformation.duration}</Typography>}
                    </div>
                    <div style={{display:"flex",flexDirection:'row'}}>
                    <AccessTimeIcon></AccessTimeIcon>
                    {<Typography style={{paddingBottom:10,marginLeft:5,textAlign:"left"}}>{'Casting time: '+spellInformation.casting_time}</Typography>}
                    </div>
                    <div style={{display:"flex",flexDirection:'row'}}>
                    <ArrowRightAlt></ArrowRightAlt>
                    {<Typography style={{paddingBottom:10,marginLeft:5,textAlign:"left"}}>{'Range: '+spellInformation.range}</Typography>}
                    </div>
                    <div style={{display:"flex",flexDirection:'row'}}>
                    <FlareOutlined></FlareOutlined>
                    {<Typography style={{paddingBottom:10,marginLeft:5,textAlign:"left"}}>{spellInformation.concentration ? 'Concentration: Yes' : 'Concentration: No'}</Typography>}
                    </div>
                    <div style={{display:"flex",flexDirection:'row'}}>
                    <Class></Class>
                    {<Typography style={{paddingBottom:10,marginLeft:5,textAlign:"left"}}>{'Classes: '}</Typography>}
                    <div style={{display:'flex',flexDirection:'row'}}>
                    {spellInformation.classes.map((item) => {
                        console.log(item.name);
                        return <Typography style={{marginLeft:10}}>{item.name}</Typography>
                    })}
                    </div>
                    </div>
                    {spellInformation.material !== undefined ? <div style={{display:"flex",flexDirection:'row'}}>
                    <div style={{display:"flex",flexDirection:'row'}}>
                    <Inventory></Inventory>
                    {<Typography style={{paddingBottom:5,textAlign:'left',marginLeft:5}}>{'Materials: '}</Typography>}
                    </div>
                    <div style={{paddingBottom:5,textAlign:"left",fontSize:'1em',marginLeft:30,marginTop:3}}>{spellInformation.material}</div>
                    </div>: null}
                    </div> 
                    <div style={{marginBottom:'5%',marginTop:'5%'}}>
                        <Button id={'CloseButtonModal'} style={{padding:10,backgroundColor:'#aedbf0',color:"black"}} onClick={() => {
                            props.onClose();
                        }}>Close</Button>
                    </div>
                </Container> : null}
        </div>
    </Modal>)
}