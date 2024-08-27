import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from '../models/team';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Venue } from '../models/venue';
import { Match } from '../models/match';
import { PlaysComponent } from "../plays/plays.component";


@Component({
  selector: 'event',
  standalone: true,
  imports: [CommonModule, PlaysComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  homeTeamId: string;
  awayTeamId: string;
  homeTeamData: Team;
  awayTeamData: Team;
  homeTeamScore: number;
  awayTeamScore: number;

  teamRest = '';
  teamPart = '';

  awayRest = '';
  awayPart = '';

  showPlays: boolean = false;

  title = 'app';
  eventData: Match = undefined;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute,) {

    this.route.paramMap.subscribe((x) => {
      this.getEvent(+x.get('id')!)
    });
  }

  getEvent(id: number): void {
    this.htttpClient
      .get<any>(
        'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/' + id
      )
      .subscribe((x) => {

        this.eventData = x;
        this.homeTeamId = this.eventData.competitions[0].competitors.find(team => team.homeAway == 'home').id;
        this.awayTeamId = this.eventData.competitions[0].competitors.find(team => team.homeAway == 'away').id;
        this.getTeam(this.homeTeamId, true);
        this.getTeam(this.awayTeamId, false);
        this.getScore(this.homeTeamId, true);
        this.getScore(this.awayTeamId, false);
      });
  }

  getTeam(id: string, isHomeTeam: boolean): void {
    this.htttpClient
      .get<Team>(
        'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/' + id
      )
      .subscribe((x) => {
        if (isHomeTeam) {
          this.homeTeamData = x;

          const teamHome = this.homeTeamData?.team.displayName || '';
          const teamParts = teamHome?.split(' ');

          this.teamRest = teamParts.slice(0, -1).join(' ');
          this.teamPart = teamParts[teamParts.length - 1];
   
        } else {
          this.awayTeamData = x;

          const teamAway = this.awayTeamData?.team.displayName || '';
          const awayParts = teamAway?.split(' ');

          this.awayRest = awayParts.slice(0, -1).join(' ');
          this.awayPart = awayParts?.[awayParts.length - 1];
      
        }
      });



  }

  getScore(id: string, isHomeTeam: boolean): void {
    this.htttpClient
      .get<any>(
        'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/' + this.eventData.id + '/competitions/' + this.eventData.id + '/competitors/' + id + '/scores/1'
      )
      .subscribe((x) => {
        if (isHomeTeam) {
          this.homeTeamScore = x.value;
        } else {
          this.awayTeamScore = x.value;
        }
      });
  }

  playComponent() {
    this.showPlays = !this.showPlays;
  }

}
