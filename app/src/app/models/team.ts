import { Venue } from "./venue";

export interface Team {
  team: {
    location: string;
    name: string;
    abbreviation: string;
    nickname: string;
    id: string;
    displayName: string;
    color: string;

    logos: {
      [0]: {
        href: string;
      };
    };

    record: {
      items: {
        [0]: {
          summary: string;
        };
      };
    };

    franchise: {
      location: string;
      venue: Venue;
    };
  };
}
