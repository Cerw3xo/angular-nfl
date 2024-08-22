export interface Play {
    shortAlternativeText: string;
    awayScore: string;
    homeScore: string;
    text: string;
    type: {
        text: string;
    }
    period: {
        number: number;
    }
    clock: {
        displayValue: string;
    }

    start: {
        yardLine: number;
    }

    end: {
        yardLine: number;
    }
}