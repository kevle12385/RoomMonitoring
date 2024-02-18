import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; 
import Alerts from './Pages/Alerts'; // Ensure correct export/import
import Home from './Pages/Home';
import NotFound from './Pages/NotFound'; // Ensure correct export/import
import axios from 'axios';
import './index.css';
import Rooms from './Pages/Rooms';
import RoomTemplate from './Pages/RoomTemplate';
import TempSimulation from './Pages/TempSimulation';






function App() {
  const [rooms, setRooms] = useState([]);
  const [alerts, setAlerts] = useState([])
  const URL = import.meta.env.VITE_API_URL;
  

  useEffect(() => { 

    axios.defaults.baseURL = URL;
  }, []); 

  /*Empty dependency array ensures this effect runs only once */


  


  return (
    
    <>
    
        <h1 className='WebsiteName'>Room Monitoring System</h1>
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>   
          </li>
          <li>
            <Link to="/alerts">Alerts</Link>     
          </li>
          <li>
            <Link to="/rooms">Rooms</Link>     
          </li>
         
          <li>
            <Link to="/tempSimulation">Temp Simulator</Link>
          </li>
        </ul>
      </nav>
      
        
      <Routes>
      <Route path="/rooms" element={ <Rooms URL={URL} rooms={rooms} setRooms={setRooms} />}>
      </Route>
        <Route path="/tempSimulation" element={<TempSimulation/>} />
        <Route path="/" element={<Home />} /> 
        <Route path="/alerts" element={<Alerts URL={URL} rooms={rooms} setRooms={setRooms} alerts={alerts} setAlerts={setAlerts} />} />
        {/* <Route path="/rooms" element={ <Rooms URL={URL} rooms={rooms} setRooms={setRooms} />}>
          </Route> */}
        <Route path="rooms/:name" element={<RoomTemplate />} />
        <Route path="*" element={<NotFound />} />
        

      </Routes>
       
    </>
  );
}

// Ensure you are using ReactDOM.createRoot() if you are on React 18



  export default App;
  
//   const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
