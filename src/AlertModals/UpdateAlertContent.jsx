import React, {useEffect,useState} from 'react'
import axios from 'axios';


function UpdateAlertContent({onClose, URL, alerts, fetchAlertData, setAlerts}) {
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [isEditView, setIsEditView] = useState(true); // Track if the modal should show the edit view
    const [selectedRoomName, setSelectedRoomName] = useState("");
    const [Upper, setUpper] = useState("");
    const [Lower, setLower] = useState("");
  

    const handleInputChange = (e) => {
        setUpper(e.target.value); // Updates the state based on input value
      };

      const handleInputChange2 = (e) => {
        setLower(e.target.value); // Updates the state based on input value
      };
    // const fetchAlerts = async () => {
    //     try {
    //         const response = await axios.get(`${URL}/api/alerts`);
            
    //         setAlerts(response.data);
    //         console.log(alerts);
    //     } catch (error) {
    //         alert('Error fetching alerts');
    //         console.error('Error fetching alerts:', error);
    //     }
    // };

    // Uncommented and modified useEffect
    useEffect(() => {
        fetchAlertData();
    }, []); 

    useEffect(() => {
        console.log(alerts); // This will log alerts whenever they change
    }, [alerts]);
    
    const handleRoomSelectionChange = (e) => {
        setSelectedRoomId(e.target.value);
        
        const alert = alerts.find(alert => alert.room_id.toString() === selectedRoomId); // Ensure matching types (string/number)
        if (alert) {
          setSelectedRoomName(alert.name);
        }
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        if (Upper.length === 0 || Lower.length === 0) {
            alert('Please enter a value.');
            return;
          }
    
        try {
          // Assuming you want to send the new room name as part of the request body
          const response = await axios.patch(`${URL}/api/alerts/${selectedRoomId}`, {
            upper_limit: Upper,
            lower_limit: Lower, // You need to include the data you're updating in the request
          });
          console.log("Alertsuccessfully updated.", response.data); // It's good to log the response for debugging
          fetchAlertData(); // Assuming fetchRoomsData is a function to refresh the rooms list
          onClose(); // Close the modal after successful update
        } catch (error) {
          console.error('Error updating alert:', error);
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
                <h3>Update Alert</h3>
               
                <div>
                     {Array.isArray(alerts) ? (
                            alerts.map(alert => (
                                <div key={alert.room_id}>
                                    <label>
                                        <input type="radio" 
                                            name="roomSelection" 
                                            value={alert.room_id}
                                            onChange={handleRoomSelectionChange}
                                            // Ensure you have a handler function like handleRoomSelectionChange
                                        />
                                        {alert.name} (Lower Limit: {alert.lowerLimit} Upper Limit: {alert.upperlimit})
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No Rooms to Edit...</p>  
                        )}
                    </div>
                    <button  onClick={handleEditClick}>Select Alert</button>
                 
                <button className="Closebutton" onClick={onClose}>Close</button>
            </div>
               ) : (  
            <div className='modal'>
                <h3>Update Alert</h3>
                <h3>Set Upper Limit and Lower Limit </h3>
            <form onSubmit={handleSubmit}>
              <input type="number" onChange={handleInputChange} value={Upper}   placeholder="New Upper Limit" />
              <br/>
              <input type="number" onChange={handleInputChange2} value={Lower}   placeholder="New Lower Limit" />
              <br/>
              <br/>
              <button  type="submit">Submit</button>
              <button className="Closebutton" onClick={onClose}>Close</button>
            </form>
            </div>
              )}
        </>
    );
}

export default UpdateAlertContent;