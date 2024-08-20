import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Roster, Athlete ,PositionRoster } from '../../../models/roster';
import { PositionRosterComponent } from '../position-roster/position-roster.component';
import { PositionWeb } from '../../../enums/position-web';
import { PositionAPI } from '../../../enums/position-api';


@Component({
  selector: 'roster',
  standalone: true,
  imports: [RouterModule, CommonModule, PositionRosterComponent ],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.css',
})
export class RosterComponent {
  PositionWeb = PositionWeb;
  PositionAPI = PositionAPI;
  title = 'app';
  rosterData?: Roster = undefined;
  selectedPosition = PositionWeb.Offense;
  athlete?: Athlete = undefined;
  positionRoster?: PositionRoster = undefined;



  constructor(private htttpClient: HttpClient, private route: ActivatedRoute,) {
    
      this.route.paramMap.subscribe((x) => {
     
        this.getTeam(+x.get('id')!)
      });
  }
  getTeam (id: number): void {
    this.htttpClient
      .get<Roster>('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/'+id+'/roster')
      .subscribe((x) => {
        this.rosterData = x;
        this.athlete = x.athletes?.[0]?.items?.[0];
      });
  }

getSelectedPositionRoster(position: PositionAPI): PositionRoster {
  return this.rosterData?.athletes?.find(x => x.position==position)
}

setSelectedPosition(position: PositionWeb) : void {
  this.selectedPosition = position;
  if (position == PositionWeb.Offense ) {
    this.athlete = this.getSelectedPositionRoster(PositionAPI.Offense).items?.[0];
  } else if (position == PositionWeb.Defense) {
    this.athlete = this.getSelectedPositionRoster(PositionAPI.Defense).items?.[0];
  } else if (position == PositionWeb.Special) {
    this.athlete = this.getSelectedPositionRoster(PositionAPI.SpecialTeam).items?.[0];
  }
}

selectedAthlete(id: string): void {
  this.rosterData?.athletes.forEach(x => {
    x.items.forEach(y => {
      if (y.id == id) {
        this.athlete = y;
        return;
      }
    })
  })
}

}
