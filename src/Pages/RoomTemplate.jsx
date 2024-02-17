import React from 'react'
import { useParams } from 'react-router-dom';

function RoomTemplate() {
    const { name } = useParams();
  return (
    <>
    <h1>RoomTemplate</h1>
    <h1>Room Name: {name}</h1>
    <h1>Limits</h1>
    </>
  )
}

export default RoomTemplate