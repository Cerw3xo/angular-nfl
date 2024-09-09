import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { Team } from '../models/team';
import { CommonModule } from '@angular/common';
import { RosterComponent } from '../shared/components/roster/roster.component';
import { StadiumComponent } from '../stadium/stadium.component';
import { TeamService } from '../services/team-service';
import { TeamListItem } from '../models/team-list-item';

@Component({
  selector: 'Team-Page',
  standalone: true,
  imports: [RouterModule, RosterComponent, CommonModule],
  providers: [ TeamService ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  title = 'app';
  teamData?: Team = undefined;
  rivals: TeamListItem[] = [];


  constructor(private htttpClient: HttpClient, private route: ActivatedRoute, private teamService: TeamService) {
    

      this.route.paramMap.subscribe((x) => {
     
        this.getTeam(+x.get('id')!)

       this.rivals = this.teamService.getDivisionRivals(+x.get('id'));
      });
  }

  getTeam (id: number): void {
    this.htttpClient
      .get<any>(
        'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/'+id
      )
      .subscribe((x) => {
       
        this.teamData = x;
      });
  }

}
