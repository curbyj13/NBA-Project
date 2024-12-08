class FilterManager {
    constructor() {
        // Initialize selectors
        this.teamFilter = document.getElementById('team-filter');
        this.positionFilter = document.getElementById('position-filter');
        this.playerFilter = document.getElementById('player-filter');
        
        // Get players data
        console.log(JSON.parse(document.getElementById('players-data').value));
        this.playersData = JSON.parse(document.getElementById('players-data').value);
        
        // Setup event listeners
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Team selection handler
        this.teamFilter.addEventListener('change', () => {
            const selectedTeam = this.teamFilter.value;
            this.positionFilter.disabled = !selectedTeam;
            this.positionFilter.value = '';
            this.playerFilter.value = '';
            this.playerFilter.disabled = true;
        });

        // Position selection handler
        this.positionFilter.addEventListener('change', () => {
            this.updatePlayerDropdown();
        });
    }

    updatePlayerDropdown() {
        const selectedTeam = this.teamFilter.value;
        const selectedPosition = this.positionFilter.value;

        // Filter players
        const filteredPlayers = this.playersData.filter(player => 
            player.team === selectedTeam && 
            player.position === selectedPosition
        );

        // Update player dropdown
        this.playerFilter.innerHTML = '<option value="">Select Player</option>';
        console.log('Filtered players:', filteredPlayers);
        filteredPlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = player.id;
            option.textContent = player.name;
            this.playerFilter.appendChild(option);
        });

        this.playerFilter.disabled = false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new FilterManager();
});