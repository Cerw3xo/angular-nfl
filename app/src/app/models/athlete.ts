export interface Athlete {
    fullName: string;
    jersey: string;
    weight: string;
    height: string;
    shortName: string;
    displayWeight: string;
    displayHeight: string;
    dateOfBirth: string;
    id: string;
    age: number;

    birthPlace: {
        city: string;
        state: string;
    }


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
