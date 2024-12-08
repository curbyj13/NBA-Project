class PlayerLoader {
    static async loadPlayers() {
        try {
            ErrorHandler.clearError();
            const playersData = JSON.parse(document.getElementById('players-data').value);
            
            if (!playersData || playersData.length === 0) {
                throw new Error('No player data available');
            }

            this.populateSelectors(playersData);
            return playersData;

        } catch (error) {
            ErrorHandler.handleDataLoadError(error);
            return [];
        }
    }

    static populateSelectors(players) {
        const selectors = ['player1-select', 'player2-select'];
        
        selectors.forEach(selectorId => {
            const select = document.getElementById(selectorId);
            if (select) {
                select.innerHTML = '<option value="">Select Player</option>';
                players.forEach(player => {
                    select.innerHTML += `
                        <option value="${player.id}">
                            ${player.name} (${player.team} - ${player.position})
                        </option>
                    `;
                });
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', PlayerLoader.loadPlayers.bind(PlayerLoader));
