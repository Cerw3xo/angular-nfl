import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RosterComponent } from '../shared/components/roster/roster.component';
import { TeamService } from '../services/team-service';
import { Article } from '../models/article';
import { TeamListItem } from '../models/team-list-item';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Division } from '../enums/divisions';

@Component({
  selector: 'news-page',
  standalone: true,
  imports: [RouterModule, RosterComponent, CommonModule, FormsModule, MatSelectModule, MatFormFieldModule],
  providers: [TeamService],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss',
})
export class NewsPageComponent {
  title = 'app';
  news: Article[] = undefined;
  teamId: number = undefined;
  teamList: TeamListItem[] = [];
  searchTeamNews: string = '';


  constructor(private htttpClient: HttpClient, private route: ActivatedRoute, private teamService: TeamService) {
    this.getNews();
    this.teamList = this.teamService.getTeams();

    this.teamList.unshift({ id: 0, name: 'All teams', division: Division.AllDivision });
  }

  getNews(): void {
    this.htttpClient
      .get<any>(
        'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?' + this.getParameters()
      )
      .subscribe((x) => {

        this.news = x.articles;
      });
  }

  getParameters(): string {
    if (this.teamId) {
      return 'team=' + this.teamId;
    }
    return 'limit=50';
  }

  filterById(id: number): void {
    if (id === 0) {
      this.teamId = null;
    } else {
      this.teamId = id;
    }
    this.getNews();
  }

  searchChange() {
    const team = this.teamList.find(team => team.name.toLowerCase().includes(this.searchTeamNews.toLowerCase()));

    if (team) {
      this.filterById(team.id);
    } else {
      console.log('team nie je najdeny');
    }
  };



}
