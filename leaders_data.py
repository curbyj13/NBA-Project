import os
import json
import logging
import requests
from pathlib import Path
from datetime import datetime

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

API_KEY = os.environ.get('SPORTRADAR_API_KEY')
URL = "https://api.sportradar.com/nba/trial/v8/en/seasons/2024/REG/leaders.json"

def fetch_data(url, api_key):
    headers = {"accept": "application/json"}
    params = {"api_key": api_key}
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching data: {e}")
        return None

def save_data(data, file_path):
    try:
        with open(file_path, "w") as file:
            json.dump(data, file, indent=4)
        logger.info(f"Data saved to {file_path}")
        return True
    except IOError as e:
        logger.error(f"Error saving data: {e}")
        return False

def log_metadata(status, message, file_saved=None):
    try:
        metadata = {
            "status": status,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        
        if file_saved:
            metadata["file_saved"] = str(file_saved)  # Convert Path to string
        
        log_path = Path("data/fetch_log.json")
        log_path.parent.mkdir(exist_ok=True)
        
        with open(log_path, "w") as log_file:
            json.dump(metadata, log_file, indent=4)
            
        logger.info("Metadata logged successfully")
    except Exception as e:
        logger.error(f"Error logging metadata: {e}")

def main():
    try:
        # Create data directory if it doesn't exist
        Path("data").mkdir(exist_ok=True)
        
        # Fetch data
        data = fetch_data(URL, API_KEY)
        if not data:
            log_metadata("failure", "Failed to fetch data")
            return

        # Save data
        file_path = Path("data/Leaders_Data.json")
        if save_data(data, file_path):
            log_metadata("success", "Data fetched and saved successfully", file_path)
        else:
            log_metadata("failure", "Failed to save data")
            
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        log_metadata("failure", f"Unexpected error: {str(e)}")

if __name__ == "__main__":
    main()