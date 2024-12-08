document.addEventListener('DOMContentLoaded', () => {
    // Get the players data from the template
    const playersData = JSON.parse(document.getElementById('players-data').value);
    
    // Populate the selectors
    populatePlayerSelectors(playersData);

    const teamFilter = document.getElementById("team-filter");
    const positionFilter = document.getElementById("position-filter");
    const playerFilter = document.getElementById("player-filter");

    const validPositions = ["PG", "SG", "SF", "PF", "C"];
    positionFilter.innerHTML = '<option value="">Select Position</option>';
    validPositions.forEach(position => {
        positionFilter.innerHTML += `<option value="${position}">${position}</option>`;
    });

    teamFilter.addEventListener("change", function () {
        const selectedTeam = teamFilter.value;
        updatePlayerList(selectedTeam, positionFilter.value);
    });

    positionFilter.addEventListener("change", function () {
        const selectedTeam = teamFilter.value;
        const selectedPosition = positionFilter.value;
        updatePlayerList(selectedTeam, selectedPosition);
    });

    function updatePlayerList(team, position) {
        const filteredPlayers = playersData.filter(player => {
            const teamMatch = !team || player.team === team;
            const positionMatch = !position || player.position === position;
            return teamMatch && positionMatch;
        });

        playerFilter.innerHTML = '<option value="">Select Player</option>';
        filteredPlayers.forEach(player => {
            playerFilter.innerHTML += `<option value="${player.name}">${player.name}</option>`;
        });
    }
});

async function loadPlayers() {
    try {
        const response = await fetch('/api/players/all');
        const players = await response.json();
        
        if (players.error) {
            throw new Error(players.error);
        }

        populatePlayerSelectors(players);
    } catch (error) {
        console.error('Error loading players:', error);
        displayError('Failed to load players. Please try again.');
    }
}

function populatePlayerSelectors(players) {
    const selectors = ['player1-select', 'player2-select', 'player-filter'];
    
    selectors.forEach(selectorId => {
        const select = document.getElementById(selectorId);
        if (select) {
            // Clear existing options
            select.innerHTML = '<option value="">Select Player</option>';
            
            // Add player options
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = `${player.name} (${player.team} - ${player.position})`;
                select.appendChild(option);
            });
        }
    });
}
// Add this event listener after existing ones
playerFilter.addEventListener("change", function() {
    const selectedPlayer = playerFilter.value;
    if (selectedPlayer) {
        fetchPlayerStats(selectedPlayer);
    }
});

// Add this function to fetch stats
async function fetchPlayerStats(playerName) {
    try {
        const response = await fetch(`/api/player-stats/${playerName}`);
        const stats = await response.json();
        updateStatsDisplay(stats);
    } catch (error) {
        console.error('Error fetching player stats:', error);
    }
}

function updateStatsDisplay(stats) {
    // Update stat values
    document.getElementById('ppg').textContent = stats.seasons?.latest?.teams[0]?.average?.points || '-';
    document.getElementById('rpg').textContent = stats.seasons?.latest?.teams[0]?.average?.rebounds || '-';
    document.getElementById('apg').textContent = stats.seasons?.latest?.teams[0]?.average?.assists || '-';
    
    // Log for debugging
    console.log('Received stats:', stats);
}
