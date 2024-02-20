import React, { useEffect}  from 'react';
import axios from 'axios';
import SetAlertModal from '../AlertModals/SetAlertModal.jsx';
import UpdateAlert from '../AlertModals/UpdateAlert.jsx';
import DeleteAlert from '../AlertModals/DeleteAlert.jsx';


function Alerts({alerts, setAlerts, URL, rooms, setRooms }) {
  

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
    fetchRoomsData();

  }, [URL]); // Dependency array to re-fetch if URL changes

  
  return (
    // JSX
    <>
    <h1>Alerts</h1>
    
    <div>
    {Array.isArray(alerts) && alerts.length > 0 ? alerts.map(alert => (
  <h3 key={alert.room_id}>{alert.name} <br/> Upper limit:{alert.upperlimit} °C <br/>Lower limit: {alert.lowerLimit} °C</h3>
)) : <p>No Alerts...</p>}

      </div>
  
    <SetAlertModal URL={URL} rooms={rooms} fetchAlertData={fetchAlertData} setRooms={setRooms} />
    <UpdateAlert fetchAlertData={fetchAlertData} URL={URL} alerts={alerts} setAlerts={setAlerts} />
    <DeleteAlert fetchAlertData={fetchAlertData} URL={URL} alerts={alerts} setAlerts={setAlerts} />
    </>
  );
}

export default Alerts;
