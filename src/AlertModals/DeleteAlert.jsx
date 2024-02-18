import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Modal from '../Modals/Modal.jsx'; // Make sure the path matches where you saved your Modal component
import DeleteAlertContent from './DeleteAlertContent.jsx';

const DeleteRoom = ( {fetchRoomsData,fetchAlertData ,rooms, URL, setRooms, alerts, setAlerts}) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
        <button onClick={() => setShowModal(true)}>Delete Alerts</button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <DeleteAlertContent rooms={rooms} setAlerts={setAlerts} alerts={alerts} setRooms={setRooms} fetchAlertData={fetchAlertData} fetchRoomsData= {fetchRoomsData}  URL= {URL} onClose={() => setShowModal(false)} />
        </Modal>
      </>
    );
  };
  
  export default DeleteRoom;