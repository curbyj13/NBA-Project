class TrendAnalysis {
    static analyzeTrends(playerData, timeRange = 'season') {
        return {
            performance: this.analyzePerformanceTrend(playerData, timeRange),
            consistency: this.calculateConsistencyMetrics(playerData),
            improvement: this.calculateImprovementRate(playerData)
        };
    }

    static analyzePerformanceTrend(playerData, timeRange) {
        const stats = playerData.stats;
        const trendData = this.getTrendDataPoints(stats, timeRange);
        
        return {
            scoring: this.calculateMovingAverage(trendData.points, 5),
            efficiency: this.calculateEfficiencyTrend(trendData),
            impact: this.calculateImpactScore(trendData)
        };
    }

    static calculateConsistencyMetrics(playerData) {
        const stats = playerData.stats;
        return {
            scoringConsistency: this.calculateStandardDeviation(stats.points_per_game),
            efficiencyConsistency: this.calculateStandardDeviation(stats.field_goal_percentage),
            performanceStability: this.calculateStabilityIndex(stats)
        };
    }

    static calculateImprovementRate(playerData) {
        const recentGames = 10;
        const stats = playerData.stats;
        
        return {
            shortTerm: this.calculateRecentImprovement(stats, recentGames),
            seasonLong: this.calculateSeasonalTrend(stats),
            projectedGrowth: this.calculateProjectedGrowth(stats)
        };
    }

    static visualizeTrends(trends, chartId) {
        const ctx = document.getElementById(chartId).getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: this.prepareTrendData(trends),
            options: this.getTrendChartOptions()
        });
    }
}
