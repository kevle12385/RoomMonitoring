import React, { useState, URL, useEffect } from 'react'; 
import '../Modals/Modal.css';
import axios from 'axios';
 
 function SendAlertContent({onClose, roomId, roomName, URL}) {
const [email, setEmail] = useState('')
const [temp, setTemp] = useState('')

const handleChange = (e) => {
    setEmail(e.target.value);
};

const handleChange2 = (e) => {
    setTemp(e.target.value);
    
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length === 0){
        alert("Please enter an email.");
        return;
    }
    try {
        const response = await axios.post(`${URL}/api/alerts/high`, {
        temp: temp,
        room_id:roomId,
        email:email,
        room_name:roomName
        
        });
        onClose(); 
    } catch (error) {
        alert('Alert did not send to your email.');
        console.error('Error Sending Alert', error);
    }
}


   return (
    <>
     
      <div className='modal'>
      <h2>Send Alert</h2>
      
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter Email' onChange={handleChange}/>
        <br/>
        <input type='text' placeholder='Enter Temperture' onChange={handleChange2}/>
        <button>Submit</button>
      </form>
      
      
      <button className='Closebutton' onClick={onClose}>Close</button>
      </div>
      
    
    </>
    
   )
 }
 
 export default SendAlertContent