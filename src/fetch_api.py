import requests
import json
import os

# Define API details
URL = "https://api.sportradar.com/nba/trial/v8/en/seasons/2024/REG/leaders.json?api_key=KRbQEY0fQH8vAfEqOoITy0I4sFawyV4wQdidI2uU"

def fetch_data():
    """Fetch data from the Sportradar API and save it to a JSON file."""
    print("DEBUG: fetch_data() function started.")  # Check if the function is called
    headers = {
        "accept": "application/json"
    }

    try:
        print("Step 1: Sending request to API...")
        response = requests.get(URL, headers=headers)
        print(f"Response received with status code: {response.status_code}")
        print(f"Response content: {response.text}")  # Print the content of the response
        response.raise_for_status()  # Raise an error for bad responses
        data = response.json()
        print("Step 1: Data fetched successfully.")

        # Save data to a JSON file
        print("Step 2: Saving data to file...")
        os.makedirs("data", exist_ok=True)
        data_file_path = os.path.join("data", "leaders_data_2024.json")
        with open(data_file_path, "w") as file:
            json.dump(data, file, indent=4)
        print(f"Data saved to {data_file_path}")

        # Step 1: Save metadata or a log file
        metadata = {
            "status": "success",
            "message": "Data fetched and saved successfully.",
            "file_saved": data_file_path
        }
        metadata_file_path = os.path.join("data", "fetch_log.json")
        with open(metadata_file_path, "w") as log_file:
            json.dump(metadata, log_file, indent=4)
        print(f"Step 1 log saved to {metadata_file_path}")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        # Save error log
        error_metadata = {
            "status": "failure",
            "error_message": str(e)
        }
        error_file_path = os.path.join("data", "fetch_log.json")
        with open(error_file_path, "w") as error_file:
            json.dump(error_metadata, error_file, indent=4)
        print(f"Error log saved to {error_file_path}")

if __name__ == "__main__":
    fetch_data()
