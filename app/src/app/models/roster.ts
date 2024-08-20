export interface Athlete {
    fullName: string;
    jersey: string;
    weight: string;
    shortName: string;
    displayWeight: string;
    displayHeight: string;
    dateOfBirth: string;
    id: string;

    headshot: {
        href: string;
    }

    position: {
        name: string;
    }

    experience: {
        years: string;
    }
}

export interface PositionRoster {
    position: string;
    items: Athlete[];
}

export interface Roster {
    athletes: PositionRoster[];
}