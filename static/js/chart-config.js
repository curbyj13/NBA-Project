class ChartConfiguration {
    static getRadarChartOptions() {
        return {
            scales: {
                r: {
                    min: 0,
                    ticks: { 
                        stepSize: 20,
                        font: { size: 12 }
                    },
                    pointLabels: {
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                tooltip: this.getTooltipConfig(),
                legend: { 
                    position: 'top',
                    labels: { font: { size: 14, weight: 'bold' }}
                },
                title: {
                    display: true,
                    text: 'Player Comparison Radar',
                    font: { size: 18, weight: 'bold' }
                }
            },
            animation: this.getAnimationConfig()
        };
    }

    static getBarChartOptions() {
        return {
            responsive: true,
            plugins: {
                tooltip: this.getTooltipConfig(),
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Statistical Comparison'
                }
            },
            scales: {
                y: { beginAtZero: true }
            },
            animation: this.getAnimationConfig()
        };
    }

    static getTooltipConfig() {
        return {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            callbacks: {
                label: this.formatTooltipLabel
            }
        };
    }

    static getAnimationConfig() {
        return {
            duration: 1000,
            easing: 'easeInOutQuart',
            onProgress: (animation) => {
                animation.chart.canvas.style.transition = 'all 0.4s ease';
            }
        };
    }
}
