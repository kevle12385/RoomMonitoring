import React, {useEffect,useState} from 'react'
import Modal from '../Modals/Modal.jsx'; // Make sure the path matches where you saved your Modal component
import UpdateAlertContent from './UpdateAlertContent.jsx';

const UpdateAlert = ( {fetchAlertData, fetchRoomsData, rooms, URL, alerts, setAlerts, setRooms}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
       <>
        <button onClick={() => setShowModal(true)}>Update Alerts</button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <UpdateAlertContent fetchAlertData={fetchAlertData} rooms={rooms} setRooms={setRooms} fetchRoomsData= {fetchRoomsData} alerts={alerts} setAlerts={setAlerts} URL= {URL} onClose={() => setShowModal(false)} />
        </Modal>
      </>
    );
  };
  
  export default UpdateAlert;