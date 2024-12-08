// Constants
const CHART_COLORS = {
    player1: {
        primary: 'rgb(0, 123, 255)',
        background: 'rgba(0, 123, 255, 0.2)'
    },
    player2: {
        primary: 'rgb(40, 167, 69)',
        background: 'rgba(40, 167, 69, 0.2)'
    }
};

const STAT_CATEGORIES = {
    points_per_game: 'Points',
    rebounds_per_game: 'Rebounds',
    assists_per_game: 'Assists',
    steals_per_game: 'Steals',
    blocks_per_game: 'Blocks',
    field_goal_percentage: 'FG%',
    three_point_percentage: '3P%',
    free_throw_percentage: 'FT%',
    minutes_per_game: 'Minutes',
    turnovers_per_game: 'Turnovers'
};

// Base Comparison Class
class BaseComparison {
    constructor() {
        this.loadingStates = {
            isLoading: false,
            hasError: false,
            errorMessage: ''
        };
    }

    setLoadingState(isLoading) {
        this.loadingStates.isLoading = isLoading;
        this.updateUIState();
    }

    handleError(error) {
        this.loadingStates.hasError = true;
        this.loadingStates.errorMessage = error.message;
        this.updateUIState();
    }

    updateUIState() {
        const container = document.querySelector('.charts-container');
        container.classList.toggle('loading', this.loadingStates.isLoading);
        container.classList.toggle('error', this.loadingStates.hasError);
    }
}

// Player Comparison Charts Class
class PlayerComparisonCharts extends BaseComparison {
    constructor() {
        super();
        this.radarChart = null;
        this.barChart = null;
        this.initializeEventListeners();
    }

    // Chart Creation Methods
    createCharts(data) {
        this.createRadarChart(data);
        this.createBarChart(data);
    }

    // Event Handlers
    async updateComparison() {
        const player1Id = document.getElementById('player1-select').value;
        const player2Id = document.getElementById('player2-select').value;

        if (player1Id && player2Id) {
            await this.fetchAndUpdateCharts(player1Id, player2Id);
        }
    }

    // Utility Methods
    formatChartData(data) {
        return {
            labels: Object.values(STAT_CATEGORIES),
            datasets: [
                {
                    label: data.player1.name,
                    data: this.getPlayerStats(data.player1),
                    backgroundColor: CHART_COLORS.player1.background,
                    borderColor: CHART_COLORS.player1.primary
                },
                {
                    label: data.player2.name,
                    data: this.getPlayerStats(data.player2),
                    backgroundColor: CHART_COLORS.player2.background,
                    borderColor: CHART_COLORS.player2.primary
                }
            ]
        };
    }
}

// Player vs Team Comparison Class
class PlayerTeamComparison extends PlayerComparisonCharts {
    constructor() {
        super();
        this.comparisonType = 'player-team';
        this.initializeTeamSelectors();
    }

    // Advanced Metrics Methods
    calculateAdvancedMetrics(data) {
        return {
            pie: this.calculatePIE(data),
            netRating: this.calculateNetRating(data),
            assistRatio: this.calculateAssistRatio(data),
            reboundRate: this.calculateReboundRate(data),
            scoringEfficiency: this.calculateScoringEfficiency(data)
        };
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const comparisonCharts = new PlayerComparisonCharts();
    window.playerComparison = comparisonCharts;
    comparisonCharts.setupInitialState();
});
