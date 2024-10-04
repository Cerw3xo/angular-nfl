export interface GameLogSplits {
    displayName: string;
    labels: string[];
    displayNames: string[];
    events: Split[];
}

export interface GameLog {
    headline: string;
    description: string;
    published: string;
}

export interface Split {
    displayName: string;
    stats: string[];
}
