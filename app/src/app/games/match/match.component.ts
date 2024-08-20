import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Match } from '../../models/match';
import { Team } from '../../models/team';

@Component({
  selector: 'match-selector',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent {

  
  @Input() url: string;

  matchData: Match;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute,) {

  }

  ngOnInit() {
    this.loadMatch();
  }

    loadMatch (): void {

      this.htttpClient
      .get<any>(
        this.url
      )
      .subscribe((x) => {

        this.matchData = x;
      
      });
    }


  
}
