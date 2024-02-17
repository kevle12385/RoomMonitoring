import React, { useEffect } from 'react';
import axios from 'axios';
 import CreateRoom from '../Modals/CreateRoom.jsx';
import DeleteRoom from '../Modals/DeleteRoom.jsx';
import EditScreen from '../Modals/EditScreen.jsx';


function Rooms({ URL, rooms, setRooms }) {
  console.log("URL:", URL);

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
      
      <div>
        {Array.isArray(rooms) ? rooms.map(room => (
          <div key={room.id}><a href={`/rooms/${room.name}`}>{room.name}</a></div>
        )) : <p>No Rooms or data is not in expected format</p>}
      </div>
  
      <EditScreen fetchRoomsData={fetchRoomsData} URL={URL} rooms={rooms} setRooms={setRooms}/>
      <CreateRoom handleRoomCreated={fetchRoomsData} />
      <DeleteRoom fetchRoomsData={fetchRoomsData} URL={URL} rooms={rooms} setRooms={setRooms}/>
    </>
  );
  


}





export default Rooms

