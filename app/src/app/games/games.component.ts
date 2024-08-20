import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from '../models/team';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Venue } from '../models/venue';
import { Season } from '../models/season';
import { Week } from '../models/week';
import { MatchComponent } from './match/match.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, MatchComponent, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, RouterModule ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  title = 'app';
  venueData?: Venue = undefined;
  seasonList = [ ];
  year: number = undefined;
  week: number = undefined;
  seasonData?: Season = undefined;
  weekData?: Week = undefined;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute,) {

    for (let i = 2024; i > 1998; i--){

      this.seasonList.push(i);
    }

    this.year = this.seasonList[0];
    this.loadSeason(this.year);
  }

    loadSeason (value: number): void {


      this.year = value;
      this.htttpClient
      .get<any>(
        'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/' + this.year + '/types/2/weeks'
      )
      .subscribe((x) => {
        this.seasonData = x;
        this.loadWeek(1);
        this.week = 1;
      });
    }

    loadSeasonBackUp (event : Event): void {
    

      this.year = +(event.target as HTMLSelectElement).value;
      this.htttpClient
      .get<any>(
        'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/' + this.year + '/types/2/weeks'
      )
      .subscribe((x) => {
  
        this.seasonData = x;
      });
    }

    loadWeek (value : number ): void {
      this.week = value;
      this.htttpClient
      .get<any>(
        'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/' + this.year + '/types/2/weeks/' + value + '/events'
      )
      .subscribe((x) => {

        //this.week = x;
        this.weekData = x;
      });
    }

    loadWeekBackUp (event : Event): void {
      this.htttpClient
      .get<any>(
        'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/' + this.year + '/types/2/weeks/' + (event.target as HTMLSelectElement).value + '/events'
      )
      .subscribe((x) => {

        this.weekData = x;
      });
    }

    onLeftClick(): void {
      this.year--;
      this.loadWeek(this.week);
    }

    onRightClick(): void {
      this.year++;
      this.loadWeek(1);
    }
  
    onWeekLeftClick(): void {
     this.week--;    
      this.loadWeek(this.week)
      
    }

    onWeekRightClick(): void {
      this.week++;
      this.loadWeek(this.week)
    }
}
