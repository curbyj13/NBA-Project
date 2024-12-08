class DataVisualization {
    constructor(chartManager) {
        this.chartManager = chartManager;
        this.charts = {};
        this.initializeCharts();
    }

    initializeCharts() {
        this.charts = {
            comparison: this.createComparisonChart(),
            stats: this.createStatsChart(),
            trends: this.createTrendsChart()
        };
    }

    createComparisonChart() {
        const ctx = document.getElementById('radarChart').getContext('2d');
        return new Chart(ctx, {
            type: 'radar',
            data: this.getComparisonData(),
            options: {
                responsive: true,
                scales: {
                    r: {
                        min: 0,
                        ticks: { stepSize: 20 }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Player Comparison'
                    }
                }
            }
        });
    }

    createStatsChart() {
        const ctx = document.getElementById('barChart').getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: this.getStatsData(),
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    createTrendsChart() {
        const ctx = document.getElementById('efficiencyChart').getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: this.getTrendsData(),
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    updateCharts(playerData) {
        Object.values(this.charts).forEach(chart => {
            chart.data = this.getUpdatedData(chart.config.type, playerData);
            chart.update();
        });
    }
}
