import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const useStyles=makeStyles(()=>({
    title:{
        flex:1,
        color:"gold",
        fontFamily:"Montserrat",
        fontWeight:"bold",
        cursor:"pointer",
    }
}))




const Header = () => {

    const classes=useStyles();
    const navigate=useNavigate();

    const GotoHome=()=>{
        navigate("/")
        window.scroll(0,0);
    }

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        }
    });

    const {currency,setcurrency,symbol}=CryptoState();
    // console.log(symbol)


  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar position='sticky' color='default' style={{zIndex:10}}>
            <Container>
                <Toolbar>
                    <Typography onClick={()=>GotoHome()} className={classes.title} variant='h5'>Crypto View</Typography>
                
                <Select
                    variant='outlined'
                    style={{
                        width:100,
                        height:40,
                        marginRight:15,
                    }}
                    value={currency}
                    onChange={(e)=>setcurrency(e.target.value)}
                   >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                </Toolbar>

            </Container>
        </AppBar>
        <Outlet/>
    </ThemeProvider>
  )
}

export default Header