import time
import random
import json

# Initial temperature range
MIN_TEMP = 20
MAX_TEMP = 25

# Extended temperature range for simulation
EXTENDED_MIN_TEMP = 10
EXTENDED_MAX_TEMP = 30

# Current temperature - starting at the midpoint of the initial range
current_temp = (MIN_TEMP + MAX_TEMP) / 2

# Initialize an empty list to store temperature readings
temperature_readings = []

def simulate_normal_temperature():
    global current_temp
    current_temp += random.uniform(-0.5, 0.5)
    current_temp = max(MIN_TEMP, min(MAX_TEMP, current_temp))
    return current_temp

def increase_temperature():
    global current_temp
    current_temp += random.uniform(1, 5)
    current_temp = min(current_temp, EXTENDED_MAX_TEMP)
    return current_temp

def decrease_temperature():
    global current_temp
    current_temp -= random.uniform(1, 5)
    current_temp = max(current_temp, EXTENDED_MIN_TEMP)
    return current_temp

def compile_to_json(action, current_temp):
    # Append the current temperature reading and action to the list
    temperature_readings.append({ "temperature": current_temp})

    # Write the updated list to a JSON file
    with open("temperature_readings.json", "w") as file:
        json.dump(temperature_readings, file, indent=4)

try:
    while True:
        action = random.choice(['normal', 'increase', 'decrease'])
        if action == 'normal':
            temp = simulate_normal_temperature()
        elif action == 'increase':
            temp = increase_temperature()
        elif action == 'decrease':
            temp = decrease_temperature()

        print(f"Current Temp: {temp:.2f}°C")
        compile_to_json(action, temp)
        
        time.sleep(1)  # Simulate a delay between readings
except KeyboardInterrupt:
    print("\nSimulation terminated by user.")
    print(temperature_readings)















