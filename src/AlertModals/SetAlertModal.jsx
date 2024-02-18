import React, { useState } from 'react';
import Modal from '../Modals/Modal.jsx'; // Make sure the path matches where you saved your Modal component
import SetAlertContent from './SetAlertContent.jsx';

const SetAlertModal = ( {fetchRoomsData,fetchAlertData ,rooms, URL, setRooms}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Set Alerts</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
<SetAlertContent rooms={rooms} setRooms={setRooms} fetchAlertData={fetchAlertData} fetchRoomsData= {fetchRoomsData}  URL= {URL} onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default SetAlertModal;