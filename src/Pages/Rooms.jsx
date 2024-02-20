import React, { useEffect } from 'react';
import axios from 'axios';
 import CreateRoom from '../Modals/CreateRoom.jsx';
import DeleteRoom from '../Modals/DeleteRoom.jsx';
import EditScreen from '../Modals/EditScreen.jsx';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';


function Rooms({ URL, rooms, setRooms }) {
  console.log("URL:", URL);

  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];


  const fetchRoomsData = () => {
    axios.get(`${URL}/api/room`)
      .then(response => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the Axios operation:', error);
      });
  };

  useEffect(() => {
    fetchRoomsData();
  }, [URL]); // Dependency array to re-fetch if URL changes



  return (
    <>
  
      <h1>Rooms</h1>

      <EditScreen fetchRoomsData={fetchRoomsData} URL={URL} rooms={rooms} setRooms={setRooms}/>
      <CreateRoom handleRoomCreated={fetchRoomsData} />
      <DeleteRoom fetchRoomsData={fetchRoomsData} URL={URL} rooms={rooms} setRooms={setRooms}/>
  
  


      <div>
        {Array.isArray(rooms) ? rooms.map(room => (
          <h2 key={room.id}><a href={`/rooms/${room.id}`}>{room.name}</a></h2>
        )) : <p>No Rooms or data is not in expected format</p>}
      </div>
  
      
    </>
  );
  


}





export default Rooms

