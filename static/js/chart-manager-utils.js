class ChartManagerUtils {
    static getActiveFilters() {
        const filters = document.querySelectorAll('.stat-filter:checked');
        return Array.from(filters).map(filter => filter.value);
    }

    static filterChartData(chartData, activeFilters) {
        const filteredData = {...chartData};
        filteredData.datasets = chartData.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.filter((_, index) => 
                activeFilters.includes(chartData.labels[index])
            )
        }));
        filteredData.labels = filteredData.labels.filter(label => 
            activeFilters.includes(label)
        );
        return filteredData;
    }

    static formatStatValue(value, type) {
        if (type.includes('percentage')) {
            return `${value.toFixed(1)}%`;
        }
        return value.toFixed(1);
    }

    static getChartVisibilityState() {
        return Object.keys(ChartManager.charts).reduce((acc, chartType) => {
            acc[chartType] = document.getElementById(`${chartType}-chart`)
                .style.display !== 'none';
            return acc;
        }, {});
    }
}
