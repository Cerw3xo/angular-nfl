import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Team } from '../models/team';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Venue } from '../models/venue';
import { Match } from '../models/match';
import { Play } from '../models/play';



@Component({
  selector: 'plays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plays.component.html',
  styleUrl: './plays.component.css'
})
export class PlaysComponent implements AfterViewInit {


  @Input() homeTeamData: Team;
  @Input() awayTeamData: Team;
  @Input() eventId: string;

  @ViewChild('field', { static: true }) field!: ElementRef<HTMLCanvasElement>;

  plays: Play[] = undefined;
  actualPlay: number = 0;
  yardLine: number;
  
  constructor( private htttpClient: HttpClient, private route: ActivatedRoute,) {

  }

  ngAfterViewInit() {
    this.drawCanvas();
  }

  ngOnInit() {
    this.getPlays();
  }

  getPlays(): void {
    this.htttpClient
      .get<any>(
        'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/' + this.eventId + '/competitions/' + this.eventId + '/plays'
      )
      .subscribe((x) => {
        console.log(x);
        this.plays = x.items;
        this.updateYardLine();
        this.clearRedrawCanvas();
      });
  }

  updateYardLine() {
    this.yardLine = this.plays?.[this.actualPlay]?.end?.yardLine;
  }

  drawCanvas() {
   
    const canvas = this.field.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const fieldWidth = canvas.width;
      const fieldHeight = canvas.height;
      const lineSpacing = fieldWidth / 10;

      //background field
      ctx.fillStyle = '#1FC55E';
      ctx.fillRect(0, 0, fieldWidth, fieldHeight);


      //vertical lines
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.lineCap = 'butt';


      for (let i = 0; i <= 10; i++) {
        const x = i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(x, 7);
        ctx.lineTo(x, fieldHeight - 7);
        ctx.stroke();
      }
    
    }
 
  }

  clearRedrawCanvas() {
    const canvas = this.field.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const fieldWidth = canvas.width;
      const fieldHeight = canvas.height;

      ctx.clearRect(0, 0, fieldWidth, fieldHeight);

      this.drawCanvas();
      this.drawYardLine();
    }

  }

  drawYardLine() {
    const canvas = this.field.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const fieldWidth = canvas.width;
      const fieldHeight = canvas.height;

      const mapYard = (this.yardLine / 100) * fieldWidth;

      ctx.beginPath();
      ctx.moveTo(mapYard, 0);
      ctx.lineTo(mapYard, fieldHeight);
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  changeActualPlay(valueChange: number) {
    this.actualPlay = this.actualPlay + valueChange;
    this.updateYardLine();
    this.clearRedrawCanvas();

  }


}


