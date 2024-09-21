export interface AthleteOverview {

    statistics: {
        displayName: string;
        labels: string[];
        displayNames: string[];
        splits: Split[];
    };

    gameLog: {
        displayName: string;
        statistics: GameLogSplits[];
    }
}

export interface Split {
    displayName: string;
    stats: string[];
}

export interface GameLogSplits {
    displayName: string;
    labels: string[];
    displayNames: string[];
    events: Split[];
}