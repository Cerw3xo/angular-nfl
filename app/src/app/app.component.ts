import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, signal, ViewChild, } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Team } from './models/team';
import { TeamComponent } from './teamPage/team.component';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, TeamComponent],
  // declarations: [TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit  {
  title = 'app';
  test?: number;
  teamData?: Team = undefined;

  interval: any;

  isBrowser = signal(false);


  @ViewChild ('myParagraph') myParagraph: ElementRef;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));  // save isPlatformBrowser in signal
  }

ngAfterViewInit() {
  console.log('after view init');
  //this.updateDate();
 
  //setInterval(() => {
    //this.updateDate();
  //}, 100);
}

ngOnInit() {
  if(this.isBrowser()) { 
    this.interval = setInterval(() => {
      console.log('interval');
      this.updateDate();
    }, 1000);
  }
}

updateDate() {
    this.myParagraph.nativeElement.textContent = this.getDate();
}


 getDate() :string {
  var d, time, minutes, hours, message, seconds, day, dayMessage, updateTime;

  d = new Date();
  hours = d.getHours();
  minutes = d.getMinutes();
  seconds = d.getSeconds();
  day = d.getDay();


  if (hours < 10) {
    hours = "0" + hours;
  } else {
    hours = hours.toString();
  }

  seconds = seconds < 10 ? "0" + seconds : seconds.toString();
  minutes = minutes < 10 ? "0" + minutes : minutes.toString();

  time = hours + minutes;
  updateTime = hours + " : " + minutes + " : " + seconds;


  if (time < "1200" && time > "0600") {
    message = "Good Morning!!  ";
  } else if (time >= "1200" && time < "1800") {
    message = " Hello everyone! ";
  } else if (time >= "1800" && time <= "2359") {
    message = "What's up this evening.. ";
  } else if (time >= "0000" && time <= "0600") {
    message = "Nighty Night! ";
  }

  if (day === 1) {
    dayMessage = " It's Monday!! ";
  } else if (day === 2) {
    dayMessage = " It's Tuesday! ";
  } else if (day == 3) {
    dayMessage = " It's Wednesday! ";
  } else if (day === 4) {
    dayMessage = " It's Thursday! ";
  } else if (day === 5) {
    dayMessage = " It's Friday! ";
  } else if (day === 6) {
    dayMessage = " It's Saturday! ";
  } else if (day === 0) {
    dayMessage = " It's Sunday! "
  } else {
    dayMessage = " What's Up!";
  }



  return dayMessage + message + updateTime;


}

}

