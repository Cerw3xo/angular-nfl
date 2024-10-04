import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RosterComponent } from '../../shared/components/roster/roster.component';
import { TeamService } from '../../services/team-service';


@Component({
  selector: 'game-log-page',
  standalone: true,
  imports: [RouterModule, RosterComponent, CommonModule],
  templateUrl: './game-log.component.html',
  styleUrl: './game-log.component.css',
})
export class GameLogComponent {
  
  @Input() athleteOverview?: any;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute, private teamService: TeamService) {

    };
}