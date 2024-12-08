class ChartDataPrep {
    static getRadarData(data) {
        return {
            labels: Object.values(STAT_CATEGORIES),
            datasets: [
                {
                    label: data.player1.name,
                    data: this.prepareRadarStats(data.player1.stats),
                    backgroundColor: CHART_COLORS.player1.background,
                    borderColor: CHART_COLORS.player1.primary,
                    pointBackgroundColor: CHART_COLORS.player1.primary
                },
                {
                    label: data.player2.name,
                    data: this.prepareRadarStats(data.player2.stats),
                    backgroundColor: CHART_COLORS.player2.background,
                    borderColor: CHART_COLORS.player2.primary,
                    pointBackgroundColor: CHART_COLORS.player2.primary
                }
            ]
        };
    }

    static getBarData(data) {
        return {
            labels: ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'],
            datasets: [
                {
                    label: data.player1.name,
                    data: Object.values(data.player1.basic),
                    backgroundColor: CHART_COLORS.player1.primary
                },
                {
                    label: data.player2.name,
                    data: Object.values(data.player2.basic),
                    backgroundColor: CHART_COLORS.player2.primary
                }
            ]
        };
    }

    static getEfficiencyData(data) {
        return {
            labels: ['PIE', 'True Shooting %', 'Usage Rate', 'Assist Ratio'],
            datasets: [
                {
                    label: data.player1.name,
                    data: Object.values(data.player1.advanced),
                    fill: true,
                    borderColor: CHART_COLORS.player1.primary,
                    backgroundColor: CHART_COLORS.player1.background
                },
                {
                    label: data.player2.name,
                    data: Object.values(data.player2.advanced),
                    fill: true,
                    borderColor: CHART_COLORS.player2.primary,
                    backgroundColor: CHART_COLORS.player2.background
                }
            ]
        };
    }
}
