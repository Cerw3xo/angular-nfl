import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RosterComponent } from '../shared/components/roster/roster.component';
import { Athlete } from '../models/athlete';
import { AthleteOverview } from '../models/athlete-overview';
import { StatisticsComponent } from './statistics/statistics.component';
import { GameLogComponent } from './game-log/game-log.component';
import { NewsComponent } from './news/news.component';
import { BirtplacePipe } from '../shared/pipes/birthplace-pipe';

@Component({
  selector: 'athlete-page',
  standalone: true,
  imports: [RouterModule, RosterComponent, CommonModule, StatisticsComponent, GameLogComponent, NewsComponent, BirtplacePipe],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
})
export class AthleteComponent {
  title = 'app';
  athleteData?: Athlete = undefined;
  athleteOverview?: AthleteOverview = undefined;
  selectedTab: string = 'statistics';

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute ) {
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
