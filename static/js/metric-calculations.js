class MetricCalculations {
    static calculatePIE(stats, gamesPlayed) {
        return (
            (stats.points + stats.rebounds + stats.assists + 
             stats.steals + stats.blocks - stats.turnovers - 
             (stats.field_goals_attempted - stats.field_goals_made)) / 
            gamesPlayed * 100
        );
    }

    static calculateEfficiencyRating(stats) {
        return (
            (stats.points_per_game + stats.rebounds_per_game + 
             stats.assists_per_game + stats.steals_per_game + 
             stats.blocks_per_game) -
            ((stats.field_goals_attempted - stats.field_goals_made) +
             (stats.free_throws_attempted - stats.free_throws_made) +
             stats.turnovers_per_game)
        );
    }

    static calculateTrueShootingPercentage(stats) {
        const points = stats.points_per_game;
        const fga = stats.field_goals_attempted;
        const fta = stats.free_throws_attempted;
        return (points / (2 * (fga + 0.44 * fta))) * 100;
    }

    static calculateAdvancedStats(stats) {
        return {
            pie: this.calculatePIE(stats, stats.games_played),
            efficiency: this.calculateEfficiencyRating(stats),
            trueShootingPct: this.calculateTrueShootingPercentage(stats),
            assistRatio: (stats.assists / stats.minutes_played) * 48,
            reboundRate: (stats.rebounds / stats.minutes_played) * 48,
            scoringEfficiency: (stats.points / stats.field_goals_attempted) * 100
        };
    }
}
