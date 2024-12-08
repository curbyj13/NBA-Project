class ChartIntegration {
    constructor() {
        this.playerData = [];
        this.initializePlayerData();
    }

    async initializePlayerData() {
        const players = await PlayerDataManager.loadAllPlayers();
        this.playerData = players;
        this.populatePlayerSelectors();
        this.setupFilterListeners();
    }

    populatePlayerSelectors() {
        const selectors = ['player1-select', 'player2-select'];
        selectors.forEach(selectorId => {
            const select = document.getElementById(selectorId);
            this.playerData.forEach(player => {
                const option = new Option(
                    `${player.name} (${player.team} - ${player.position})`, 
                    player.id
                );
                select.add(option);
            });
        });
    }

    setupFilterListeners() {
        const teamFilter = document.getElementById('team-filter');
        const positionFilter = document.getElementById('position-filter');
        
        teamFilter.addEventListener('change', () => this.filterPlayers());
        positionFilter.addEventListener('change', () => this.filterPlayers());
    }

    filterPlayers() {
        const teamValue = document.getElementById('team-filter').value;
        const positionValue = document.getElementById('position-filter').value;
        
        const filteredPlayers = this.playerData.filter(player => {
            const teamMatch = !teamValue || player.team === teamValue;
            const positionMatch = !positionValue || player.position === positionValue;
            return teamMatch && positionMatch;
        });

        this.updatePlayerSelectors(filteredPlayers);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ChartIntegration();
});
