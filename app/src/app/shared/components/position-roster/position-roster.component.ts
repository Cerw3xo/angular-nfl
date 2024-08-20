import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PositionRoster, Roster } from '../../../models/roster';



@Component({
  selector: 'position-roster',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './position-roster.component.html',
  styleUrl: './position-roster.component.css',
})
export class PositionRosterComponent { 
  title = 'app';

  @Input () rosterData?: PositionRoster = undefined;

  @Output () selectAthlete = new EventEmitter<string>();

  constructor() {}

  onAthleteClick(id: string): void {
    this.selectAthlete.emit(id);
  }
}
