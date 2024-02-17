
import React, { useState } from 'react';
import Modal from './Modal'; // Make sure the path matches where you saved your Modal component
import EditScreenContent from './EditScreenContent.jsx';

const EditScreen = ({ onClose, URL ,fetchRoomsData, rooms, setRooms }) => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Room Names</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <EditScreenContent URL={URL} fetchRoomsData={fetchRoomsData} setRooms={setRooms} rooms= {rooms} onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default EditScreen;