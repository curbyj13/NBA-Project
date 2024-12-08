class DataProcessors {
    static processComparisonData(playerData) {
        return {
            labels: ['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks', 'FG%', '3P%', 'FT%'],
            datasets: playerData.map((player, index) => ({
                label: player.name,
                data: [
                    player.stats.points_per_game,
                    player.stats.rebounds_per_game,
                    player.stats.assists_per_game,
                    player.stats.steals_per_game,
                    player.stats.blocks_per_game,
                    player.stats.field_goal_percentage,
                    player.stats.three_point_percentage,
                    player.stats.free_throw_percentage
                ],
                backgroundColor: `rgba(${index === 0 ? '52, 152, 219' : '46, 204, 113'}, 0.2)`,
                borderColor: index === 0 ? '#3498db' : '#2ecc71'
            }))
        };
    }

    static processEfficiencyData(playerData) {
        return {
            labels: playerData[0].stats.game_dates,
            datasets: playerData.map((player, index) => ({
                label: `${player.name} Efficiency`,
                data: this.calculateEfficiencyTrend(player.stats),
                borderColor: index === 0 ? '#3498db' : '#2ecc71',
                fill: false,
                tension: 0.4
            }))
        };
    }

    static calculateAdvancedMetrics(stats) {
        return {
            trueShootingPct: this.calculateTrueShooting(stats),
            effectiveFGPct: this.calculateEffectiveFG(stats),
            perMinuteStats: this.calculatePerMinuteStats(stats),
            usageRate: this.calculateUsageRate(stats)
        };
    }

    static normalizeStats(stats) {
        const maxValues = this.getMaxValues(stats);
        return Object.entries(stats).reduce((acc, [key, value]) => {
            acc[key] = (value / maxValues[key]) * 100;
            return acc;
        }, {});
    }
}
