document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    const app = {
        chartManager: new ChartManager(),
        eventHandlers: new EventHandlers(),
        dataFormatters: new DataFormatters(),
        metricCalculations: new MetricCalculations()
    };

    // Set up global configuration
    Chart.defaults.font.family = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;

    // Initialize event listeners
    EventHandlers.initializeEventListeners();

    // Create initial empty state
    ChartManager.renderCharts({
        player1: { name: 'Select Player 1', stats: {} },
        player2: { name: 'Select Player 2', stats: {} }
    });

    // Make app instance available globally if needed
    window.nbaComparison = app;
});
