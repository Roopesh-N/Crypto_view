import { makeStyles } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import { TrendingCoins } from '../../config/api'
import axios from "axios";
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils/constants';

const useStyles=makeStyles(()=>({
    carousel:{
        display:"flex",
        height:"50%",
        alignItems:"center",
    },
    carouselItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white"

    },

}))


const Carousel = () => {
    const {symbol,currency}=CryptoState();
    const classes=useStyles();

    const [trendingData, settrendingData]= useState([]);

    const fetchTrendingCoins=useCallback(async()=>{
        try{
            const {data}= await axios.get(TrendingCoins(currency))
            settrendingData(data);
        }catch(error){
            console.log(error)
        }
        const {data}= await axios.get(TrendingCoins(currency))
        settrendingData(data);
    },[currency]);
    const responsive={
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
      }

      const items=trendingData.map((coin)=>{
        const profit=coin.price_change_percentage_24h>=0;
        return (
            <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="60"
                    style={{marginBottom:10}}
                    />

                    <span>
                        {coin?.symbol}
                        &nbsp;
                        <span style={{
                        color:profit>0?"#03C03C":"red",
                        fontWeight:900,
                    }} >
                            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%  
                        </span>
                    </span>
                    <span style={{fontSize:22, fontWeight:500}}>
                        {symbol} {" "} {numberWithCommas(coin?.current_price?.toFixed(2))}
                    </span>
            </Link>
        )
      })




    useEffect(()=>{
        fetchTrendingCoins();
    },[currency]);


  return (
    <div className={classes.carousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        responsive={responsive}
        items={items}
        
        />
    </div>
  )
}

export default Carousel