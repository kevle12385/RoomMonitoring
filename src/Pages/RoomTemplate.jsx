import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TempSimulation from './TempSimulation';

function RoomTemplate({ URL }) {
  const { id } = useParams();
  const [room, setRoom] = useState(null); // Corrected initialization

  const fetchRoomsData = () => {
    axios.get(`${URL}/api/room/${id}`)
      .then(response => {
        const roomData = response.data[0]; // Access the first object in the array

       
        setRoom(roomData); // Adjusted for direct assignment
      })
      .catch(error => {
        console.error('There was a problem with the Axios operation:', error);
      });
  };

  useEffect(() => {
    fetchRoomsData();
  }, [URL, ]); // Added id to dependency array to refetch if id changes

  return (
    <>
      <h1>{room ? room.name : 'Loading room...'}</h1>
      {room && <TempSimulation roomId={room.id} URL={URL}/>}
    </>
  );
}

export default RoomTemplate;
