class ChartManager {
    static charts = {
        radar: null,
        bar: null,
        efficiency: null
    };

    static async updateComparison() {
        StateManager.updateLoadingState(true);
        StateManager.clearError();

        try {
            const comparisonType = document.getElementById('comparison-type').value;
            const data = await this.fetchComparisonData(comparisonType);
            
            if (data) {
                this.destroyExistingCharts();
                this.renderCharts(data);
                this.updateStatDisplay(data);
            }
        } catch (error) {
            StateManager.setError(error);
        } finally {
            StateManager.updateLoadingState(false);
        }
    }

    static async fetchComparisonData(type) {
        const player1Id = document.getElementById('player1-select').value;
        const player2Id = document.getElementById('player2-select').value;
        const teamId = document.getElementById('team-select')?.value;

        if (!this.validateInputs(player1Id, player2Id, teamId, type)) {
            throw new Error('Please select all required fields');
        }

        const endpoint = this.getComparisonEndpoint(type, player1Id, player2Id, teamId);
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return response.json();
    }

    static validateInputs(player1Id, player2Id, teamId, type) {
        if (type === 'player-team') {
            return player1Id && teamId;
        }
        return player1Id && player2Id;
    }

    static getComparisonEndpoint(type, player1Id, player2Id, teamId) {
        return type === 'player-team'
            ? `/api/compare-player-team/${player1Id}/${teamId}`
            : `/api/compare-players/${player1Id}/${player2Id}`;
    }

    static renderCharts(data) {
        const container = document.querySelector('.charts-container');
        this.charts = ChartRenderers.renderComparisonCharts(data, container);
    }

    static destroyExistingCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
    }

    static updateChartData() {
        const activeFilters = this.getActiveFilters();
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.data = this.filterChartData(chart.data, activeFilters);
                chart.update();
            }
        });
    }
}