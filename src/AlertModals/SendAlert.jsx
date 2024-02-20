import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Modal from '../Modals/Modal.jsx'; // Make sure the path matches where you saved your Modal component
import SendAlertContent from './SendAlertContent.jsx';

const SendAlert = ( {roomName, fetchRoomsData,fetchAlertData ,rooms, URL, setRooms, alerts, setAlerts, roomId}) => {
    const [showModal, setShowModal] = useState(false);
  

    return (
      <>
      
        <button onClick={() => setShowModal(true)}>Send Alert</button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <SendAlertContent URL= {URL} roomName= {roomName} roomId={roomId} rooms={rooms} setAlerts={setAlerts} alerts={alerts} setRooms={setRooms} fetchAlertData={fetchAlertData} fetchRoomsData= {fetchRoomsData}  onClose={() => setShowModal(false)} />
        </Modal>
      </>
    );
  };
  
  export default SendAlert;