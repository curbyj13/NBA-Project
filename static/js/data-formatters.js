class DataFormatters {
    static formatPlayerStats(playerData) {
        return {
            basic: this.formatBasicStats(playerData.stats),
            advanced: this.formatAdvancedStats(playerData.stats),
            shooting: this.formatShootingStats(playerData.stats)
        };
    }

    static formatBasicStats(stats) {
        return {
            points: stats.points_per_game.toFixed(1),
            rebounds: stats.rebounds_per_game.toFixed(1),
            assists: stats.assists_per_game.toFixed(1),
            steals: stats.steals_per_game.toFixed(1),
            blocks: stats.blocks_per_game.toFixed(1)
        };
    }

    static formatAdvancedStats(stats) {
        const advancedStats = MetricCalculations.calculateAdvancedStats(stats);
        return {
            pie: advancedStats.pie.toFixed(1),
            efficiency: advancedStats.efficiency.toFixed(1),
            trueShootingPct: advancedStats.trueShootingPct.toFixed(1),
            assistRatio: advancedStats.assistRatio.toFixed(1),
            reboundRate: advancedStats.reboundRate.toFixed(1)
        };
    }

    static formatShootingStats(stats) {
        return {
            fieldGoalPct: (stats.field_goal_percentage).toFixed(1),
            threePtPct: (stats.three_point_percentage).toFixed(1),
            freeThrowPct: (stats.free_throw_percentage).toFixed(1)
        };
    }
}
