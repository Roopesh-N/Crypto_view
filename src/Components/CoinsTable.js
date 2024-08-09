import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import {Pagination} from '@material-ui/lab';
import React, { useCallback, useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { CoinList } from '../config/api';
import { useNavigate} from 'react-router-dom';
import { numberWithCommas } from '../utils/constants';

const useStyles=makeStyles(()=>({
    row:{
        cursor:"pointer",
        backgroundColor:"#16171a",
        "&:hover":{
            backgroundColor:"#131111",
        },
        fontFamily:"Montserrat"
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color:"gold",
        },
    },
}))


const CoinsTable = () => {
    const classes=useStyles();
    const {currency,symbol}=CryptoState();
    const [coins,setCoins]=useState();
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState("");
    const navigate=useNavigate();
    const [page,setpage]=useState(1);

    const fetchCoins=useCallback(async()=>{
        try{
            setloading(true);
            const response=await axios.get(CoinList(currency))
            if(response.status<200 || response.status>300){
                throw new Error("Request Failed with status code:", response.status)
            }
            setCoins(response.data);
            // console.log(response.data);
            setloading(false);
        }
        catch(error){
            console.log(error);
        }
        // finally{
        //     setloading(false)
        // }
    },[currency]);
    const searchedCoins=()=>{
        if(coins){
        return coins.filter((coin)=> coin?.symbol.toLowerCase().includes(search) || coin?.name.toLowerCase().includes(search));
    }
    else{
        return [];
    }
}
    useEffect(()=>{
        fetchCoins();
    },[currency])

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff", 
            },
            type:"dark",
        }
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography variant="h4"
                style={{margin:20, fontFamily:"Montserrat"}}>Cryptocurrency prices by Market Cap</Typography>
                <TextField variant='outlined' value={search} label="Search for crypto." 
                            style={{width:"100%", marginBottom:"10px"}} 
                            onChange={(e)=>setsearch(e.target.value)}/>
            <TableContainer>
                {loading ?(<LinearProgress style={{backgroundColor:"gold"}} />):
                <Table>
                    <TableHead style={{backgroundColor:"#EEBC1D"}}>
                        <TableRow>
                            {
                                ["Coin", "Price","24h Change", "Market Cap"].map((field)=>{
                                    return (
                                        <TableCell style={{
                                            color:"black",
                                            fontWeight:"700",
                                            fontFamily:"Montserrat",
                                        }}
                                        key={field}
                                        align={field==="Coin"?"":"right"}
                                        >
                                            {field}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchedCoins().slice((page*10)-10,(page*10)).map((coin)=>{
                            const profit=coin.price_change_percentage_24h>0;

                            return (
                                <TableRow 
                                    key={coin.id}
                                    onClick={()=>navigate(`/coins/${coin.id}`)}
                                    className={classes.row}>
                                        <TableCell component="th" scope='row' styles={{display:"flex", gap:15}}>
                                        <img
                                            src={coin?.image}
                                            alt={coin.name}
                                            height="40"
                                            style={{marginBottom:10}}
                                            />
                                            <div style={{display:"flex", flexDirection:"column"}}>
                                                <span style={{textTransform:"uppercase", fontSize:22}}>
                                                    {coin?.symbol}
                                                </span>
                                                <span style={{color:"gray"}}>
                                                    {coin?.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" style={{fontWeight:800, fontSize:16}}>
                                            {symbol}{" "}
                                            {numberWithCommas(coin.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell align="right" style={{color:profit>0?"#7FFF00":"red", fontSize:16, fontWeight:500}}>
                                            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%  
                                        </TableCell>
                                        <TableCell align="right" style={{color:profit>0?"#7FFF00":"red", fontSize:16, fontWeight:500}}>
                                        {symbol }{" "}{numberWithCommas(coin.market_cap.toString().slice(0,-6))}M
                                        </TableCell>
                                        

                                </TableRow>
                            )

                        })}
                    </TableBody>

                </Table>
                }
            </TableContainer>
            <Pagination 
                style={{
                    padding:20,
                    display:"flex",
                    justifyContent:"center",
                    width:"100%"
                }}
                count={(searchedCoins()?.length/10).toFixed(0)}
                className={{ul: classes.pagination}}
                onChange={(_,value)=>{
                    setpage(value);
                    window.scroll(0,450)
                }}   
            />

        </Container>

    </ThemeProvider>
  )
}

export default CoinsTable