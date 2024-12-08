import requests
import logging
from pathlib import Path
import json
from datetime import datetime

import time

class NBAApiHandler:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.sportradar.com/nba/trial/v8/en"
        self.headers = {"accept": "application/json"}
        self.request_delay = 1.2  # Delay between requests in seconds
        
    def _make_request(self, endpoint):
        url = f"{self.base_url}{endpoint}"
        params = {"api_key": self.api_key}
        try:
            time.sleep(self.request_delay)  # Add delay before each request
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"API request failed: {e}")
            return None


    def get_daily_changes(self, year, month, day):
        return self._make_request(f"/league/{year}/{month:02d}/{day:02d}/changes.json")

    def get_daily_injuries(self, year, month, day):
        return self._make_request(f"/league/{year}/{month:02d}/{day:02d}/daily_injuries.json")

    def get_daily_schedule(self, year, month, day):
        return self._make_request(f"/games/{year}/{month:02d}/{day:02d}/schedule.json")

    def get_daily_transfers(self, year, month, day):
        return self._make_request(f"/league/{year}/{month:02d}/{day:02d}/transfers.json")

    def get_free_agents(self):
        return self._make_request("/league/free_agents.json")

    def get_game_boxscore(self, game_id):
        return self._make_request(f"/games/{game_id}/boxscore.json")

    def get_game_pbp(self, game_id):
        return self._make_request(f"/games/{game_id}/pbp.json")

    def get_game_summary(self, game_id):
        return self._make_request(f"/games/{game_id}/summary.json")

    def get_injuries(self):
        return self._make_request("/league/injuries.json")

    def get_hierarchy(self):
        return self._make_request("/league/hierarchy.json")

    def get_leaders(self, year, season_type="REG"):
        return self._make_request(f"/seasons/{year}/{season_type}/leaders.json")

    def get_player_profile(self, player_id):
        return self._make_request(f"/players/{player_id}/profile.json")

    def get_rankings(self, year, season_type="REG"):
        return self._make_request(f"/seasons/{year}/{season_type}/rankings.json")

    def get_schedule(self, year, season_type="REG"):
        return self._make_request(f"/games/{year}/{season_type}/schedule.json")
