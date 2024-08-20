export interface Venue { 
        id: string;
        fullName: string;
        indoor: boolean;

        address: {
          city: string;
        }

        images: {
          [0]: {
            href: string;
          };
        };
      };
    

