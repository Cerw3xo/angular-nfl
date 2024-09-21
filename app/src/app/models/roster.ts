import { Athlete } from "./athlete";

export interface PositionRoster {
    position: string;
    items: Athlete[];
}

export interface Roster {
    athletes: PositionRoster[];
}