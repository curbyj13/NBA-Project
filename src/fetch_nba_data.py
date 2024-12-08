import os
import logging
from nba_api_handler import NBAApiHandler
from pathlib import Path
import json

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def save_json(data, filename):
    path = Path("data") / filename
    path.parent.mkdir(exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=4)
    logging.info(f"Saved {filename}")

def main():
    api_key = os.environ.get("SPORTRADAR_API_KEY")
    if not api_key:
        logging.error("SPORTRADAR_API_KEY not set")
        return

    logging.info("Starting NBA data fetch")
    nba = NBAApiHandler(api_key)
    
    # Fetch and save data
    data = {
        "daily_changes": nba.get_daily_changes(2024, 8, 1),
        "daily_injuries": nba.get_daily_injuries(2024, 8, 1),
        "daily_schedule": nba.get_daily_schedule(2024, 8, 1),
        "daily_transfers": nba.get_daily_transfers(2024, 8, 1),
        "free_agents": nba.get_free_agents(),
        "injuries": nba.get_injuries(),
        "hierarchy": nba.get_hierarchy(),
        "leaders": nba.get_leaders(2024),
        "rankings": nba.get_rankings(2024)
    }

    for name, content in data.items():
        if content:
            save_json(content, f"{name}.json")

if __name__ == "__main__":
    main()
