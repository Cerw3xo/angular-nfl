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

    news: News[];


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

export interface News {
    headline: string;
    description: string;
    published: string;
}