import "./Modal.css";
import axios from 'axios';
import React, { useState } from 'react';

export default function EditScreenContent({ onClose, URL, fetchRoomsData, rooms, setRooms }) {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isEditView, setIsEditView] = useState(true); // Track if the modal should show the edit view
  const [roomName, setRoomName] = useState('');
  const [selectedRoomName, setSelectedRoomName] = useState(""); // To store the selected room's current name


  
  const handleRoomSelectionChange = (e) => {
    setSelectedRoomId(e.target.value);
    

    const room = rooms.find(room => room.id.toString() === selectedRoomId); // Ensure matching types (string/number)
    if (room) {
      setSelectedRoomName(room.name);
    }
  };

  const handleEditClick = () => {
    if (selectedRoomId) {
      setIsEditView(false);
      console.log("Proceeding with room ID: ", selectedRoomId);

    } else {
      alert('Please select a room to edit.');
    }
  };

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomName.length === 0) {
      alert('Please enter a new name.');
      return;
    }

    try {
      // Assuming you want to send the new room name as part of the request body
      const response = await axios.patch(`${URL}/api/room/${selectedRoomId}`, {
        name: selectedRoomName,
        newName: roomName, // You need to include the data you're updating in the request
      });
      console.log("Room name successfully updated.", response.data); // It's good to log the response for debugging
      fetchRoomsData(); // Assuming fetchRoomsData is a function to refresh the rooms list
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <>
      {isEditView ? (
        <div className="modal">
          <h3>Edit Room Name</h3>
          <div>
            {Array.isArray(rooms) ? rooms.map(room => (
              <div key={room.id}>
                <label>
                  <input type="radio" 
                    name="roomSelection" 
                    value={room.id} 
                    onChange={handleRoomSelectionChange}
                  />
                  {room.name}
                </label>
              </div>
            )) : <p>No Rooms to Edit...</p>}
          </div>
          <button onClick={handleEditClick}>Select Room</button> 
          <button className="Closebutton" onClick={onClose}>Close</button>
        </div>
      ) : (
        <div className="modal">
          <h3>Change Name</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" value={roomName} onChange={handleInputChange} placeholder="New Name" />
            <button type="submit">Submit</button>
          </form>
          <button className="Closebutton" onClick={onClose}>Close</button>
        </div>
      )}
    </>
  );
}
