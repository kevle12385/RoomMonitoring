import React, { useState } from 'react';
import Modal from './Modal'; // Make sure the path matches where you saved your Modal component
import DeleteRoomContent from './DeleteRoomContent.jsx';

const DeleteRoom = ( {fetchRoomsData, rooms,URL, setRooms}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Room</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
<DeleteRoomContent fetchRoomsData={fetchRoomsData} rooms={rooms} setRooms={setRooms} URL= {URL} onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default DeleteRoom;