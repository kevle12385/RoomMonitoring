import React, {useEffect,useState} from 'react'
import '../Modals/Modal.css'
import axios from 'axios';


function SetAlertContent({onClose ,fetchAlertData, rooms,URL, setRooms}) {
    const [isEditView, setIsEditView] = useState(true); // Track if the modal should show the edit view
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const [selectedRoomName, setSelectedRoomName] = useState(""); // To store the selected room's current name
    const [Upper, setUpper] = useState("");
    const [Lower, setLower] = useState("");

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (Upper.length === 0 || Lower.length === 0) {
          alert('Please enter a value.');
          return;
        }

        try {
        const response = await axios.post(`${URL}/api/alerts/set/room/${selectedRoomId}`, {
        upperLimit: Upper,
        lowerLimit: Lower,
        });
        console.log("Alert name successfully updated.", response.data); // It's good to log the response for debugging
        setUpper('');
        setLower('');
        fetchAlertData();
        onClose(); 
        
        } catch (error) {
          alert('Alert already created');

            console.error('Error Creating Alert:', error);

        }
    }

  

    const handleInputChange = (e) => {
        setUpper(e.target.value); // Updates the state based on input value
      };

      const handleInputChange2 = (e) => {
        setLower(e.target.value); // Updates the state based on input value
      };
      
      const handleRoomSelectionChange = (e) => {
        const newSelectedRoomId = e.target.value; // Get the selected room ID from the event
        setSelectedRoomId(newSelectedRoomId); // Set the selected room ID state
    
        // Find the room object from the rooms array
        const room = rooms.find(room => room.id.toString() === newSelectedRoomId); 
        if (room) {
            setSelectedRoomName(room.name); // Set the selected room's name state
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



   

    return (

    <>
    {isEditView ? (
        <div className="modal">
    
            <h3>Set Alerts</h3>
            
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
          <button className="Closebutton" onClick={onClose}>Close</button>
          <button onClick={handleEditClick} >Select Room</button> 
        </div>
         ) : (
            <div className="Alertmodal">
            <h2>{`Create Alert for ${selectedRoomName}`}</h2>
            
            <form onSubmit={handleSubmit}>
              <h3>Set Upper Limit and Lower Limit </h3>
              <input type="number" value={Upper} onChange={handleInputChange}  placeholder="New Upper Limit" />
              <br/>
              <input type="number" value={Lower} onChange={handleInputChange2}  placeholder="New Lower Limit" />
              <br/>
              <br/>
              <button  type="submit">Submit</button>
             
            </form>
            <button className="Closebutton" onClick={onClose}>Close</button>
          </div>
        )}


</>
      );
    }

export default SetAlertContent;
