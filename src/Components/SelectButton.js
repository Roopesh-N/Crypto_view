import { makeStyles } from '@material-ui/core'
import React from 'react'


const SelectButton = ({children, onClick, selected}) => {
    const useStyles=makeStyles(()=>({
        btn:{
            border:"1px solid gold",
            padding:10,
            paddingLeft:15,
            paddingRight:15,
            borderRadius:5,
            cursor:"pointer",
            backgroundColor:selected?"gold":"",
            color:selected?"black":"",
            "&:hover":{
                backgroundColor:"gold",
                color:"black"
            },
            width:"22%"
        },
    }))
    const classes=useStyles()
  return (
    <span className={classes.btn}
        onClick={onClick}
        >{children}</span>
  )
}

export default SelectButton

