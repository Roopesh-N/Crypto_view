import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import {makeStyles} from "@material-ui/core";

const approuter=createBrowserRouter([
  { 
    element:<Header/>,
    children:[
      {
        path:"/",
        element:<Homepage/>
      },
      {
        path:"/coins/:id",
        element:<CoinPage/>
      }
    ]
  }
])

const useStyles=makeStyles(()=>(
  {
    App:{
      backgroundColor:"#16141a",
      color:"white",
      minHeight:"100vh"
    }
  }));

function App() {
  const classes=useStyles();
  return (
    <div className={classes.App}>

      <RouterProvider router={approuter}/>
    </div>
  );
}

export default App;
