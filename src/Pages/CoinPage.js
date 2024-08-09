import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../Components/CoinInfo';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from '../utils/constants';

const useStyles=makeStyles((theme)=>({
  container:{
    display:"flex",
    [theme.breakpoints.down("md")]:{
      flexDirection:"column",
      alignItems:"center"
    } 
  },
  sidebar:{
    width:"30%",
    [theme.breakpoints.down("md")]:{
      width:"100%",
    },
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop:25,
    borderRight:"2px solid gray"
  },
  description:{
    width:"100%",
    fontFamily:"Montserrat",
    padding:25,
    paddingBottom:15,
    paddingTop:0,
    textAlign:"justify"
  },
  marketData:{
    alignSelf:"start",
    padding:25,
    paddingTop:10,
    width:"100%",
    [theme.breakpoints.down("md")]:{
      display:"flex",
      justifyContent:"space-around"
    },
    [theme.breakpoints.down("sm")]:{
      flexDirection:"column",
      alignItems:"center"
    },
    [theme.breakpoints.down("xs")]:{
      alignItems:"start"
    },  
  },
  coinInfo:{
    width:"70%",
    textAlign:"center",
    [theme.breakpoints.down("md")]:{
      width:"100%"
    }
  }

}))

const CoinPage = () => {
  const classes=useStyles()
  const {id}=useParams();
  const [coin, setcoin] = useState();
  const {symbol, currency}=CryptoState();
  const fetchCoin=async()=>{
    try{
      const {data}=await axios.get(SingleCoin(id))
      setcoin(data);
    }catch(error){
      console.log("coin fetch error",error)
    }
  }
  useEffect(()=>{
    fetchCoin();
  },[id])

  // console.log(coin)
  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
      <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="180"
          style={{marginBottom:10}}
        />
        <Typography variant='h3' style={{marginBottom:20, fontWeight:"bold", fontFamily:"Monserrat"}}>{coin?.name}</Typography>
        <Typography variant='subtitle2' className={classes.description}>{coin?.description?.en.split(". ")[0]}</Typography>
        <div className={classes.marketData}>
          <span style={{display:"flex"}}>
            <Typography variant='h5'>Rank:</Typography>&nbsp; &nbsp;
            <Typography variant='h5'>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5'>Current Price:</Typography>&nbsp; &nbsp;
            <Typography variant='h5'>{symbol}{" "}{numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5'>Market Cap:</Typography>&nbsp; &nbsp;
            <Typography variant='h5'>{symbol }{" "}{numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
          </span>
        </div>
      </div>
      <div className={classes.coinInfo}>
          <CoinInfo coin={coin}/>
      </div>
    </div>
  )
}

export default CoinPage