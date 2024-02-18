
import "./Modal.css";
import axios from 'axios';
import React, { useState } from 'react'; 

export default function EditScreenContent({ onClose, URL , rooms, setRooms }) {
    const [selectedRoomIds, setSelectedRoomIds] = useState([]);

const handleRoomSelectionChange = (selectedId, isChecked) => {
    setSelectedRoomIds(prevSelectedIds => isChecked 
        ? [...prevSelectedIds, selectedId ] 
        : prevSelectedIds.filter(id => id !== selectedId)

        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedRoomIds.length === 0) {
            alert('Please select at least one room to delete.');
            return;
        }

        try {
            await Promise.all(selectedRoomIds.map(roomId =>
                axios.delete(`${URL}/api/room/${roomId}`) // Dynamically construct URL with room ID
            ));
            console.log("Room(s) deleted successfully");
            // Optionally, refresh the rooms list here
            setRooms(prevRooms => prevRooms.filter(room => !selectedRoomIds.includes(room.id)));
            setSelectedRoomIds([]); // Clear selection after deletion
            onClose();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };



  return (
    <div className="modal">

        <h3>Delete Rooms</h3>
<form onSubmit={handleSubmit}>
    
        <div>
        {Array.isArray(rooms) ? rooms.map(room => (
            <div key={room.id}>
                <label>
                    <input type="checkbox" 
                    name="roomCheckbox" 
                    value={room.id} 
                    onChange={(e) => handleRoomSelectionChange(room.id, e.target.checked)}
                    />
                    {room.name}
                    
                </label>
            </div>
        )) : <p>No Rooms to Delete...</p>}
      </div>
      <button>Submit</button>
</form>
    

      <button className="Closebutton" onClick={onClose}>Close</button>

    </div>
    
  );
}