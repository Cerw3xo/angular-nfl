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
  styleUrl: './match.component.scss'
})
export class MatchComponent {
  
  @Input() url: string;

  firstRow: string;
  secondRow: string;

  matchData: Match;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute,) {

  }

  ngOnInit() {
    this.loadMatch();
  }

  isUpcoming (date?: string) : boolean {
    const matchDate = new Date(date);
    const today = new Date();
    return matchDate > today;
  }

    loadMatch (): void {
      this.htttpClient
      .get<any>(
        this.url
      )
      .subscribe((x) => {

  
        this.matchData = x;

        const matchName = this.matchData?.name || '';
        let indexSepar = matchName.indexOf(' at ');

        this.firstRow = matchName.slice(0, indexSepar);
        this.secondRow = matchName.slice( indexSepar + 3);

        
        // this.firstRow = indexSepar.slice(0, indexSepar);
      });
    }


}
