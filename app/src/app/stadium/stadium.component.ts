import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Team } from '../models/team';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Venue } from '../models/venue';


@Component({
  selector: 'app-stadium',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stadium.component.html',
  styleUrl: './stadium.component.css'
})
export class StadiumComponent {
  title = 'app';
  venueData?: Venue = undefined;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute,) {

    this.route.paramMap.subscribe((x) => {
      this.getTeam(+x.get('id')!)
    });
  }

    getTeam (id: number): void {
      this.htttpClient
      .get<any>(
        'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/venues/'+id
      )
      .subscribe((x) => {
        this.venueData = x;
      });
    }
  
}
