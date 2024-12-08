class AdvancedVisualizations {
    static createAdvancedMetricsChart(playerData) {
        const ctx = document.getElementById('advancedMetricsChart').getContext('2d');
        return new Chart(ctx, {
            type: 'radar',
            data: this.getAdvancedMetricsData(playerData),
            options: this.getAdvancedChartOptions()
        });
    }

    static getAdvancedMetricsData(playerData) {
        return {
            labels: [
                'True Shooting %',
                'Effective FG %',
                'Usage Rate',
                'Points Per 36',
                'Player Efficiency'
            ],
            datasets: playerData.map((player, index) => {
                const metrics = AdvancedMetrics.calculateAdvancedMetrics(player.stats);
                return {
                    label: player.name,
                    data: [
                        metrics.trueShootingPct,
                        metrics.effectiveFGPct,
                        metrics.usageRate,
                        metrics.perMinuteStats.pointsPer36,
                        metrics.playerEfficiency
                    ],
                    backgroundColor: `rgba(${index === 0 ? '52, 152, 219' : '46, 204, 113'}, 0.2)`,
                    borderColor: index === 0 ? '#3498db' : '#2ecc71'
                };
            })
        };
    }

    static getAdvancedChartOptions() {
        return {
            responsive: true,
            scales: {
                r: {
                    min: 0,
                    ticks: { stepSize: 20 },
                    pointLabels: {
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label;
                            const value = context.raw.toFixed(1);
                            return `${label}: ${value}`;
                        }
                    }
                },
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Advanced Metrics Comparison',
                    font: { size: 18, weight: 'bold' }
                }
            }
        };
    }
}
