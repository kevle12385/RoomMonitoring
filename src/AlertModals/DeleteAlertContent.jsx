import React, { useState, useEffect } from 'react'; 
import '../Modals/Modal.css';
import axios from 'axios';

function DeleteAlertContent({ onClose, URL , alerts, setAlerts }) {
    const [selectedRoomIds, setSelectedRoomIds] = useState([]);

    const fetchAlertData = () => {
        axios.get(`${URL}/api/alerts`)
          .then(response => {
            console.log(response.data);
            setAlerts(response.data);
          })
          .catch(error => {
            console.error('There was a problem with the Axios operation:', error);
          });
      };

    useEffect(() => {
        fetchAlertData();
    }, []); 



    const handleRoomSelectionChange = (selectedId, isChecked) => {
        setSelectedRoomIds(prevSelectedIds => isChecked 
            ? [...prevSelectedIds, selectedId ] 
            : prevSelectedIds.filter(id => id !== selectedId)
    
            );
        };
    

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('Alerts received:', alerts);

            if (selectedRoomIds.length === 0) {
                alert('Please select at least one alert to delete.');
                return;
            }
    
            try {
                await Promise.all(selectedRoomIds.map(roomId =>
                    axios.delete(`${URL}/api/alerts/${roomId}`) // Dynamically construct URL with room ID
                ));
                console.log("Alert(s) deleted successfully");
                // Optionally, refresh the rooms list here
                setAlerts(prevAlerts => prevAlerts.filter(alert => !selectedRoomIds.includes(alert.room_id)));
                setSelectedRoomIds([]); // Clear selection after deletion
                onClose();
                fetchAlertData();
            } catch (error) {
                console.error('Error deleting alert:', error);
            }
        };





  return (
    <div className='modal'>DeleteAlertContent
    
    <h3>Delete Rooms</h3>
        <form onSubmit={handleSubmit}>
            <div>
                {Array.isArray(alerts) ? alerts.map(alert => (
                    <div key={alert.room_id}>
                        <label>
                            <input type="checkbox" 
                            name="roomCheckbox" 
                            value={alert.room_id} 
                            onChange={(e) => handleRoomSelectionChange(alert.room_id, e.target.checked)}
                            />
                            {alert.name}
                            
                        </label>
                    </div>
                )) : <p>No Alerts to Delete...</p>}
            </div>
            <button>Submit</button>
        </form>
        <button className="Closebutton" onClick={onClose}>Close</button>

    
    
    
    
    </div>

  )
}

export default DeleteAlertContent;