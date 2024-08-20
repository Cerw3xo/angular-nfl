import { Injectable } from "@angular/core";
import { Division } from "../enums/divisions";
import { TeamListItem } from "../models/team-list-item";

@Injectable ({
  providedIn: 'root',
})

export class TeamService {


    private teams1: TeamListItem[] = [
    { id: 2, name: 'Buffallo Bills', division: Division.AFCEast },
    { id: 15, name: 'Miami Dolphins', division: Division.AFCEast},
    { id: 20, name: 'New York Jets', division: Division.AFCEast },
    { id: 17, name: 'New England Patriots', division:Division.AFCEast },
    { id: 23, name: 'Pittsburgh Steelers', division: Division.AFCNorth },
    { id: 4, name: 'Cincinnati Bengals', division: Division.AFCNorth },
    { id: 5, name: 'Cleveland Browns', division: Division.AFCNorth},
    { id: 33, name: 'Baltimore Ravens', division: Division.AFCNorth },
    { id: 30, name: 'Jacksonville Jaguars', division:Division.AFCSouth },
    { id: 11, name: 'Indianapolis Colts',division:Division.AFCSouth },
    { id: 10, name: 'Tennessee Titans', division:Division.AFCSouth },
    { id: 34, name: 'Houston Texans' , division:Division.AFCSouth},
    { id: 12, name: 'Kansas City Chiefs', division: Division.AFCWest },
    { id: 13, name: 'Las Vegas Raiders', division: Division.AFCWest},
    { id: 7, name: 'Denver Broncos', division: Division.AFCWest },
    { id: 24, name: 'Los Angeles Chargers', division: Division.AFCWest },
    { id: 6, name: 'Dallas Cowboys', division: Division.NFCEast },
    { id: 21, name: 'Philadelphia Eagles', division: Division.NFCEast },
    { id: 28, name: 'Washington Commanders', division: Division.NFCEast },
    { id: 19, name: 'New York Giants', division: Division.NFCEast},
    { id: 8, name: 'Detroit Lions', division: Division.NFCNorth },
    { id: 9, name: 'Green Bay Packers', division: Division.NFCNorth },
    { id: 16, name: 'Minnesota Vikings', division: Division.NFCNorth },
    { id: 3, name: 'Chicago Bears', division: Division.NFCNorth },
    { id: 27, name: 'Tampa Bay Buccaneers', division: Division.NFCSouth },
    { id: 18, name: 'New Orleans Saints', division: Division.NFCSouth },
    { id: 1, name: 'Atlanta Falcons', division: Division.NFCSouth },
    { id: 29, name: 'Carolina Panthers', division: Division.NFCSouth },
    { id: 25, name: 'San Francisco 49ers', division: Division.NFCWest },
    { id: 14, name: 'Los Angeles Rams', division: Division.NFCWest },
    { id: 26, name: 'Seattle Seahawks', division: Division.NFCWest },
    { id: 22, name: 'Arizona Cardinals', division: Division.NFCWest },
  ];

  public getTeams(): TeamListItem[] {
    return this.teams1;
  }

  getDivisionRivals(id: number): TeamListItem[] {


    // const teamFind =  this.teams1.find(team => {
    //   return id == team.id;
    // });

    // console.log('find()');
    // const teamFind =  this.teams1.find(this.isTeamEqual);
    // console.log('result: ', teamFind);

    // console.log('filter');
    // const teamFilter =  this.teams1.filter(this.isTeamEqual);
    // console.log('result: ', teamFilter);

    console.log('test', false || (true && false));

    const displayedTeam = this.teams1.find(team => id == team.id);
    return this.teams1.filter(team => team.division == displayedTeam.division && id != team.id);
  }

  // isTeamEqual(team: TeamListItem): boolean {
  //   console.log('team', team, 'return', team.id > 25);
  //   return team.id > 25;
  // }
}

