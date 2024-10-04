import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RosterComponent } from '../../shared/components/roster/roster.component';
import { TeamService } from '../../services/team-service';


@Component({
  selector: 'statistics-page',
  standalone: true,
  imports: [RouterModule, RosterComponent, CommonModule],
  providers: [TeamService],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  
  @Input() athleteOverview?: any;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute, private teamService: TeamService) {

    };
}