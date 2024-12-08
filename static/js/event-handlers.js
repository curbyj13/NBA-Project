class EventHandlers {
    static initializeEventListeners() {
        this.setupPlayerSelectors();
        this.setupComparisonTypeSwitch();
        this.setupChartToggles();
        this.setupDataFilters();
    }

    static setupPlayerSelectors() {
        const selectors = ['player1-select', 'player2-select', 'team-select'];
        selectors.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    ChartManager.updateComparison();
                });
            }
        });
    }

    static setupComparisonTypeSwitch() {
        const typeSwitch = document.getElementById('comparison-type');
        if (typeSwitch) {
            typeSwitch.addEventListener('change', (e) => {
                const type = e.target.value;
                this.toggleComparisonMode(type);
            });
        }
    }

    static setupChartToggles() {
        const chartTypes = ['radar', 'bar', 'efficiency'];
        chartTypes.forEach(type => {
            const toggle = document.getElementById(`${type}-chart-toggle`);
            if (toggle) {
                toggle.addEventListener('click', () => {
                    this.toggleChart(type);
                });
            }
        });
    }

    static setupDataFilters() {
        const filters = document.querySelectorAll('.stat-filter');
        filters.forEach(filter => {
            filter.addEventListener('change', () => {
                ChartManager.updateChartData();
            });
        });
    }
}
