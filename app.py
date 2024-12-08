import os
import requests
from flask import Flask, render_template, jsonify
from datetime import datetime
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_url_path='/static')
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

class NBAGameData:
    def __init__(self):
        self.API_KEY = os.getenv('NBA_API_KEY')
        if not self.API_KEY:
            raise ValueError("NBA_API_KEY not found. Make sure it is set in the .env file.")
        self.BASE_URL = 'https://api.sportradar.com/nba/trial/v8/en'

    def _make_request(self, endpoint):
        url = f'{self.BASE_URL}{endpoint}'
        params = {'api_key': self.API_KEY}
        try:
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.Timeout:
            logging.error(f'Request timeout for {url}')
            return None
        except requests.exceptions.RequestException as e:
            logging.error(f'Error making API request to {url}: {e}')
            return None
    def get_league_leaders(self, year, season_type='REG'):
        endpoint = f'/seasons/{year}/{season_type}/leaders.json'
        return self._make_request(endpoint)

    def get_game_schedule(self, year, month, day):
        endpoint = f'/games/{year}/{month}/{day}/schedule.json'
        return self._make_request(endpoint)

@app.route('/')
def home():
    data = {
        'teams': [
            'Boston Celtics',
            'Brooklyn Nets',
            'LA Lakers',
            'Golden State Warriors',
            'Miami Heat'
        ],
        'players': [
            {
                'id': '1',
                'name': 'Stephen Curry',
                'team': 'Golden State Warriors',
                'position': 'PG'
            },
            {
                'id': '2',
                'name': 'LeBron James',
                'team': 'LA Lakers',
                'position': 'SF'
            },
            {
                'id': '3',
                'name': 'Jayson Tatum',
                'team': 'Boston Celtics',
                'position': 'SF'
            },
            {
                'id': '4', 
                'name': 'Jimmy Butler',
                'team': 'Miami Heat',
                'position': 'SF'
            }
        ]
    }
    return render_template('index.html', data=data)

@app.route('/api/player-stats/<player_id>')
def player_stats(player_id):
    try:
        nba_data = NBAGameData()
        stats = nba_data.get_player_stats(player_id)
        if stats is None:
            return jsonify({'error': 'Player stats not found'}), 404
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

def get_player_stats(self, player_id):
    endpoint = f'/players/{player_id}/profile.json'
    return self._make_request(endpoint)
