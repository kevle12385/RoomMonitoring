import React from 'react'
import TempSimulation from './TempSimulation'


function Home() {
  return (
    <>

    <h1>Home </h1>
    <h2>Created by Kevin Le</h2>
    <h3>Note: The simulation graph does not update the real database 
    {<br/>}because it crashes it. Keep in mind when using this application, 
    {<br/>}creating, deleting, updating the rooms and alerts will actaully 
    {<br/>}make changes to the database. If the buttons don't work, click on
    {<br/>}this link </h3>
    <a href="https://vimeo.com/916345917?share=copy" target="_blank">Watch the Demo</a>

  
    </>
    
  )
}

export default Home