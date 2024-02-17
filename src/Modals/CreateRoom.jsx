
import React, { useState } from 'react';
import Modal from './Modal'; // Make sure the path matches where you saved your Modal component
import CreateRoomContent from './CreateRoomContent.jsx';
import axios from 'axios';


const CreateRoom = ({ handleRoomCreated }) => {
  const [showModal, setShowModal] = useState(false);



  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Room</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateRoomContent handleRoomCreated={handleRoomCreated} onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default CreateRoom;