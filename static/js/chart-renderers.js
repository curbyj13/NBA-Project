class ChartRenderers {
    static renderComparisonCharts(data, container) {
        const formattedData = DataFormatters.formatPlayerStats(data);
        
        return {
            radar: this.renderRadarChart(formattedData, container),
            bar: this.renderBarChart(formattedData, container),
            efficiency: this.renderEfficiencyChart(formattedData, container)
        };
    }

    static renderRadarChart(data, container) {
        const ctx = container.querySelector('#radarChart').getContext('2d');
        return new Chart(ctx, {
            type: 'radar',
            data: this.getRadarData(data),
            options: ChartConfiguration.getRadarChartOptions()
        });
    }

    static renderBarChart(data, container) {
        const ctx = container.querySelector('#barChart').getContext('2d');
        return new Chart(ctx, {
            type: 'bar',
            data: this.getBarData(data),
            options: ChartConfiguration.getBarChartOptions()
        });
    }

    static renderEfficiencyChart(data, container) {
        const ctx = container.querySelector('#efficiencyChart').getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: this.getEfficiencyData(data),
            options: ChartConfiguration.getEfficiencyChartOptions()
        });
    }
}
