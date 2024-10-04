export interface Split {
    displayName: string;
    stats: string[];
}

export interface Statistics {
    displayName: string;
    labels: string[];
    displayNames: string[];
    events: Split[];
}

