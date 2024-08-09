import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { BannerImg } from '../../utils/constants';
import Carousel from './Carousel';

const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:`url(${BannerImg})`,
    },
    bannerContent:{
        height:350,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
        // textAlign:"center"
    },
    tagLine:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        height:"40%",
        justifyContent:"center",
    }


}))

const Banner = () => {
    const classes=useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagLine}>
            <Typography variant='h2' style={{
                fontWeight:"bold", 
                marginBottom:15,
                fontFamily:"Montserrat",
            }}>Crypto View</Typography>
            <Typography variant='subtitle2' style={{
                color:"darkgrey",
                textTransform:"capitalize",
                fontFamily:"Montserrat"
            }}>Get All the info regarding crypto currency</Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner