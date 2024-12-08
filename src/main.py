
import json
from datetime import datetime
import os

def load_api_data():
    try:
        with open('data/api_data.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print("Error: api_data.json not found")
        return None
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in api_data.json")
        return None

def log_fetch_status(status, message, filename):
    log_data = {
        "status": status,
        "message": message,
        "file_saved": filename
    }
    with open('data/fetch_log.json', 'w') as file:
        json.dump(log_data, file, indent=4)

def main():
    data = load_api_data()
    if data:
        print(f"Loaded NBA data for {data['league']['name']}")
        print(f"Time period: {data['start_time']} to {data['end_time']}")
        print(f"Total games scheduled: {len(data['schedule'])}")
        print(f"Total teams: {len(data['standings'])}")

if __name__ == "__main__":
    main()
