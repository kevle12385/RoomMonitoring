import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer  } from 'victory';
import SendAlert from '../AlertModals/SendAlert';


const TempSimulation = ({ roomId, URL, roomName }) => {
    const [currentTemp, setCurrentTemp] = useState((20 + 25) / 2);
    const [isActive, setIsActive] = useState(false);
    const [temperatureReadings, setTemperatureReadings] = useState([]);
    const [data, setData] = useState([]);
    const [alerts, setAlerts] = useState([])


    
    const fetchAlertData = () => {
        axios.get(`${URL}/api/alerts/${roomId}`)
          .then(response => {
            console.log(response.data[0]);
            console.log(roomId);

            setAlerts(response.data[0]);
          })
          .catch(error => {
            console.error('There was a problem with the Axios operation:', error);
          });
      };

      useEffect(() => {
        fetchAlertData();
    
      }, [URL]); 

    

      useEffect(() => {
        console.log("Updated data:", data);
      }, [data]); // This effect will run whenever `data` changes.
      

    const clearData = () => {
        setTemperatureReadings([]);
    }
    

    useEffect(() => {
        const interval = setInterval(() => {
            if (isActive) {
                // Randomly choose between simulating normal temperature, increasing, or decreasing
                const action = Math.floor(Math.random() * 3); // Generates a random number between 0 and 2
                let newTemp;
                if (action === 0) {
                    newTemp = simulateNormalTemperature();
                } else if (action === 1) {
                    newTemp = increaseTemperature();
                } else {
                    newTemp = decreaseTemperature();
                }
                console.log(`Current Temp: ${newTemp}`);
                setCurrentTemp(newTemp);
                setTemperatureReadings(readings => [...readings, { timestamp: new Date().toISOString(), temperature: newTemp }]);

                // Optionally, send data to server or store it locally
                // sendDataToServer(newTemp);
            }
        }, 1000);

      
        

        return () => clearInterval(interval);
    }, [isActive]);

    const simulateNormalTemperature = () => Math.max(20, Math.min(25, currentTemp + (Math.random() * 2 - 1)));
    const increaseTemperature = () => Math.min(30, currentTemp + Math.random() * 5 + 1);
    const decreaseTemperature = () => Math.max(10, currentTemp - (Math.random() * 5 + 1));
    
 
    const handleUpdateTemperature = (action) => {
        let newTemp = currentTemp;
        switch (action) {
            case 'normal': newTemp = simulateNormalTemperature(); break;
            case 'increase': newTemp = increaseTemperature(); break;
            case 'decrease': newTemp = decreaseTemperature(); break;
            default: break;
        }
        newTemp = parseFloat(newTemp.toFixed(2));
        console.log(`Current Temperature: ${newTemp}°C`);

        setCurrentTemp(newTemp);
        // sendDataToServer(newTemp);
    };

    const toggleSimulation = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <h2>Current Temperature: {currentTemp.toFixed(2)}°C</h2>
            <button onClick={toggleSimulation}>
                {isActive ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <button onClick={() => handleUpdateTemperature('normal')}>Normal Temp</button>
            <button onClick={() => handleUpdateTemperature('increase')}>Increase Temp</button>
            <button onClick={() => handleUpdateTemperature('decrease')}>Decrease Temp</button>
            <button onClick={clearData} >Clear Data </button>
            <SendAlert roomName= {roomName} URL={URL} roomId={roomId}/>
           
           
            <div className="chart-container">
            {temperatureReadings.length > 0 && (
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        containerComponent={<VictoryVoronoiContainer/>} // Wrap with VictoryVoronoiContainer

                    >
                        <VictoryAxis
                            tickFormat={(t) => new Date(t).toLocaleTimeString()}
                            style={{ tickLabels: { angle: -45, fontSize: 8, padding: 15 }, grid: { stroke: "none" } }}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => `${x.toFixed(2)}°C`}
                            style={{ grid: { stroke: "none" }}}
                        />
                        <VictoryLine
                            data={temperatureReadings.map(reading => ({
                                x: reading.timestamp,
                                y: reading.temperature,
                            }))}
                            labels={({ datum }) => `${datum.y.toFixed(2)}°C at ${new Date(datum.x).toLocaleTimeString()}`} // Customize tooltip text
                            labelComponent={
                                <VictoryTooltip
                                    flyoutStyle={{ stroke: "tomato", strokeWidth: 2, fill: "white" }}
                                    style={{ fontSize: 10 }}
                                />
                            }
                            style={{
                                data: { stroke: "#c43a31" },
                            }}
                            
                        />
                       {
  alerts && alerts.upperlimit && (
    <VictoryLine
      data={[
        { x: temperatureReadings[0]?.timestamp, y: alerts.upperlimit },
        { x: temperatureReadings[temperatureReadings.length - 1]?.timestamp, y: alerts.upperlimit }
      ]}
      style={{ data: { stroke: "blue", strokeWidth: 2 } }}
    />
  )
}
{
  alerts && alerts.lowerLimit && (
    <VictoryLine
      data={[
        { x: temperatureReadings[0]?.timestamp, y: alerts.lowerLimit },
        { x: temperatureReadings[temperatureReadings.length - 1]?.timestamp, y: alerts.lowerLimit }
      ]}
      style={{ data: { stroke: "blue", strokeWidth: 2 } }}
    />
  )
}
                    </VictoryChart>
                )}
            </div>

        </div>
    );
};

export default TempSimulation;
