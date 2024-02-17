import React, { useEffect}  from 'react';
import axios from 'axios';
import SetAlertModal from '../AlertModals/SetAlertModal.jsx';



function Alerts({alerts, setAlerts, URL, rooms, setRooms }) {
  

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
  }, [URL]); // Dependency array to re-fetch if URL changes

  
  return (
    // JSX
    <>
    <h1>Alerts</h1>
    <h1>Display Alerts</h1>
    <div>
    {Array.isArray(alerts) && alerts.length > 0 ? alerts.map(alert => (
  <h3 key={alert.room_id}>{alert.name} <br/> Upper limit:{alert.upperlimit} °F <br/>Lower limit: {alert.lowerLimit} °F</h3>
)) : <p>No Alerts...</p>}

      </div>
    <h1>Set Alerts</h1>
    <h1>Delete Alerts</h1>
    <h1> Update Alerts</h1>
    <SetAlertModal URL={URL} rooms={rooms} setRooms={setRooms} />
    </>
  );
}

export default Alerts;
