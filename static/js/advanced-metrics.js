class AdvancedMetrics {
    static calculateTrueShooting(stats) {
        const points = stats.points_per_game;
        const fga = stats.field_goals_attempted;
        const fta = stats.free_throws_attempted;
        return (points / (2 * (fga + 0.44 * fta))) * 100;
    }

    static calculateEffectiveFG(stats) {
        const fgm = stats.field_goals_made;
        const fga = stats.field_goals_attempted;
        const threePtMade = stats.three_pointers_made;
        return ((fgm + 0.5 * threePtMade) / fga) * 100;
    }

    static calculatePerMinuteStats(stats) {
        const minutes = stats.minutes_played;
        return {
            pointsPer36: (stats.points_per_game / minutes) * 36,
            reboundsPer36: (stats.rebounds_per_game / minutes) * 36,
            assistsPer36: (stats.assists_per_game / minutes) * 36,
            stealsPer36: (stats.steals_per_game / minutes) * 36,
            blocksPer36: (stats.blocks_per_game / minutes) * 36
        };
    }

    static calculateUsageRate(stats) {
        const teamPossessions = stats.team_possessions;
        const playerPossessions = stats.field_goals_attempted + 
                                (0.44 * stats.free_throws_attempted) + 
                                stats.turnovers;
        return (playerPossessions / teamPossessions) * 100;
    }

    static calculatePlayerEfficiency(stats) {
        return (
            stats.points_per_game + 
            stats.rebounds_per_game + 
            stats.assists_per_game + 
            stats.steals_per_game + 
            stats.blocks_per_game - 
            (stats.field_goals_attempted - stats.field_goals_made) -
            (stats.free_throws_attempted - stats.free_throws_made) -
            stats.turnovers
        );
    }
}
