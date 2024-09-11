import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Team } from '../models/team';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Venue } from '../models/venue';
import { Match } from '../models/match';
import { Play } from '../models/play';



@Component({
  selector: 'plays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plays.component.html',
  styleUrl: './plays.component.scss'
})

export class PlaysComponent implements AfterViewInit {

  @Input() homeTeamData: Team;
  @Input() awayTeamData: Team;
  @Input() eventId: string;

  @ViewChild('field', { static: true }) field!: ElementRef<HTMLCanvasElement>;

  plays: Play[] = [];
  actualPlay: number = 0;
  startYardLine: number;
  endYardLine: number;
  pageIndex = 1;

  interval: NodeJS.Timeout;

  constructor(private htttpClient: HttpClient, private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.drawCanvas();
    }
  }

  ngOnInit() {
    this.getPlays();
  }


  getPlays(): void {
    this.htttpClient
      .get<{ items: Play[], pageCount: number }>(
        'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/' + this.eventId + '/competitions/' + this.eventId + '/plays?page=' + this.pageIndex
      )
      .subscribe((x) => {
        if (isPlatformBrowser(this.platformId)) {
          this.plays.push(...x.items.filter(x => x.type.text !== 'Official Timeout'));
          this.updateYardLine();
          this.clearRedrawCanvas();

        }

        if (this.pageIndex < x.pageCount) {
          this.pageIndex++;
          this.getPlays();
        }
      });
  }

  updateYardLine() {
    this.startYardLine = this.plays?.[this.actualPlay]?.start?.yardLine;
    this.endYardLine = this.plays?.[this.actualPlay]?.end?.yardLine;
  }


  drawCanvas() {

    const canvas = this.field.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const fieldWidth = canvas.width;
      const fieldHeight = canvas.height;
      const lineSpacing = fieldWidth / 10;
      const secondLine = fieldWidth / 20;

      //background field
      ctx.fillStyle = '#66e3a9';
      ctx.fillRect(0, 0, fieldWidth, fieldHeight);

      //vertical lines
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      for (let i = 0; i <= 10; i++) {
        const x = i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(x, 7);
        ctx.lineTo(x, fieldHeight - 22);
        ctx.stroke();
      }

      //5 YARDS LINE
      for (let i = 0; i <= 20; i++) {
        const y = i * secondLine;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(y, 9);
        ctx.lineTo(y, fieldHeight - 9);
        ctx.stroke();
      }
      //YARD LINE NUMBERS 
      ctx.font = '26px Poppins';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';

      for (let i = 0; i < 5; i++) {
        const yardNumber = 50 - (i * 10);
        const xPositionLeft = (fieldWidth / 2) - (i * lineSpacing);
        const xPositionRight = (fieldWidth / 2) + (i * lineSpacing);

        ctx.fillText(yardNumber.toString(), xPositionLeft, fieldHeight - 3);

        if (yardNumber !== 50) {
          ctx.fillText(yardNumber.toString(), xPositionRight, fieldHeight - 3);
        }
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

      const mapEndYard = (this.endYardLine / 100) * fieldWidth;
      const mapStarYard = (this.startYardLine / 100) * fieldWidth;

      //DRAW LINE START
      ctx.beginPath();
      ctx.moveTo(mapStarYard, 0);
      ctx.lineTo(mapStarYard, fieldWidth);
      ctx.strokeStyle = '#0099e4';
      ctx.lineWidth = 3;
      ctx.stroke();


      //DRAW LINE END
      ctx.beginPath();
      ctx.moveTo(mapEndYard, 0);
      ctx.lineTo(mapEndYard, fieldHeight);
      ctx.strokeStyle = '#ae2761';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }


  changeActualPlay(valueChange: number) {
    const controlPlay = this.actualPlay + valueChange;
    if (controlPlay >= 0 && controlPlay < this.plays.length) {
      this.actualPlay = controlPlay;
      this.updateYardLine();
      this.clearRedrawCanvas();
    }
  }

  startInterval() {
    if (this.interval == undefined) {
      this.interval = setInterval(() => {
        this.changeActualPlay(1)
      }, 2000);
    }
  }


  stopInterval() {
    clearInterval(this.interval);
    this.interval = undefined;
  }




}


