export interface Match {
 name: string;
 shortName: string;
 date: string;
 id: string;
 competitions: {
     competitors: {
    id: string;
    homeAway: 'away' | 'home';
 }[];
 }[];

}