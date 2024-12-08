class TrendVisualizations {
    static createTrendCharts(playerData) {
        return {
            performance: this.createPerformanceChart(playerData),
            consistency: this.createConsistencyChart(playerData),
            improvement: this.createImprovementChart(playerData)
        };
    }

    static createPerformanceChart(playerData) {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const trends = TrendAnalysis.analyzePerformanceTrend(playerData);
        
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: playerData.stats.game_dates,
                datasets: [
                    {
                        label: 'Scoring Trend',
                        data: trends.scoring,
                        borderColor: '#3498db',
                        fill: false
                    },
                    {
                        label: 'Efficiency Trend',
                        data: trends.efficiency,
                        borderColor: '#2ecc71',
                        fill: false
                    }
                ]
            },
            options: this.getPerformanceChartOptions()
        });
    }

    static createConsistencyChart(playerData) {
        const ctx = document.getElementById('consistencyChart').getContext('2d');
        const consistency = TrendAnalysis.calculateConsistencyMetrics(playerData);
        
        return new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Scoring', 'Efficiency', 'Impact'],
                datasets: [{
                    label: 'Consistency Metrics',
                    data: [
                        consistency.scoringConsistency,
                        consistency.efficiencyConsistency,
                        consistency.performanceStability
                    ],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db'
                }]
            },
            options: this.getConsistencyChartOptions()
        });
    }

    static getChartOptions() {
        return {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'nearest'
                },
                legend: {
                    position: 'top'
                }
            }
        };
    }
}
