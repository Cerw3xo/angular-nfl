export interface Athlete {
    fullName: string;
    jersey: string;
    weight: string;
    shortName: string;
    displayWeight: string;
    displayHeight: string;
    dateOfBirth: string;
    id: string;
    age: number;


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
