import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { Team } from '../models/team';
import { CommonModule } from '@angular/common';
import { RosterComponent } from '../shared/components/roster/roster.component';
import { StadiumComponent } from '../stadium/stadium.component';
import { TeamService } from '../services/team-service';
import { TeamListItem } from '../models/team-list-item';
import { Athlete } from '../models/athlete';
import { AthleteOverview } from '../models/athlete-overview';

@Component({
  selector: 'Athlete-page',
  standalone: true,
  imports: [RouterModule, RosterComponent, CommonModule],
  providers: [TeamService],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
})
export class AthleteComponent {
  title = 'app';
  athleteData?: Athlete = undefined;
  athleteOverview?: AthleteOverview = undefined;

  selectedTab: string = 'statistics';



  constructor(private htttpClient: HttpClient, private route: ActivatedRoute, private teamService: TeamService) {


    this.route.paramMap.subscribe((x) => {

      this.getAthlete(+x.get('id'));
      this.getOverview(+x.get('id'));

    });
  }

  getOverview(id: number): void {
    this.htttpClient
      .get<any>(
        'https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/' + id + '/overview'
      )
      .subscribe((x) => {

        this.athleteOverview = x;
      });
  }

  getAthlete(id: number): void {
    this.htttpClient
      .get<any>(
        'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/' + id
      )
      .subscribe((x) => {

        this.athleteData = x;
      });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
