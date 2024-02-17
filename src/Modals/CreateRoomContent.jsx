import React, { useState } from 'react';
import "./Modal.css";
import axios from 'axios';



export default function CreateRoomContent({ onClose, URL, handleRoomCreated }) {

    const [roomName, setRoomName] = useState('');

    const handleInputChange = (e) => {
        setRoomName(e.target.value);
      };



      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        // Assuming you have a base URL set globally as shown in previous examples
        // and your API endpoint for creating a room is '/rooms'
        try {
          const response = await axios.post('/api/room', { name: roomName });
          console.log('Room created successfully:', response.data);
          // Clear the input field after successful submission
          setRoomName('');
          handleRoomCreated();
          onClose();
          // Optionally, handle any actions after room creation (e.g., display a message or redirect)
        } catch (error) {
          console.error('Error creating room:', error);
                    
          // Optionally, handle any error actions here
        }
       
      };
    


  return (
    <div className="modal">

        <h3>Create Room</h3>
        <form  onSubmit={handleSubmit}>
            <input type="text" id="textbox" name="name" onChange={handleInputChange}/>
            <button >Create</button>
        </form> 
    

      <button className="Closebutton" onClick={onClose}>Close</button>

    </div>
  );
}