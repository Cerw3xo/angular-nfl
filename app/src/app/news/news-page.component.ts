import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RosterComponent } from '../shared/components/roster/roster.component';
import { TeamService } from '../services/team-service';
import { Article } from '../models/article';
import { TeamListItem } from '../models/team-list-item';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Division } from '../enums/divisions';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@Component({
	selector: 'news-page',
	standalone: true,
	imports: [RouterModule, RosterComponent, CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatIcon, MatIconButton, MatIconModule, MatSuffix, LoadingSpinnerComponent, LoadingSpinnerComponent],
	providers: [TeamService],
	templateUrl: './news-page.component.html',
	styleUrl: './news-page.component.scss',
})
export class NewsPageComponent {
	@ViewChild('scrollContainer') scrollContainer: ElementRef;

	title = 'app';
	news: Article[] = undefined;
	teamId: number = undefined;
	teamList: TeamListItem[] = [];
	searchTeamNews: string = '';
	filteredTeamList: TeamListItem[] = [];
	limit: number = 10;
	isLoading: boolean = true;
	intervalOnScroll: any = null;


	constructor(private htttpClient: HttpClient, private route: ActivatedRoute, private teamService: TeamService) {
		this.getNews();
		this.teamList = this.teamService.getTeams();
		this.filteredTeamList = this.teamList;

		this.teamList.unshift({ id: 0, name: 'All teams', division: Division.AllDivision });
	}


	getNews(): void {
		this.htttpClient
			.get<any>(
				'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?' + this.getParameters()
			)
			.subscribe((x) => {
				const newArticles = x.articles.filter(article => {
					return !this.news?.find(found => found.dataSourceIdentifier == article.dataSourceIdentifier);
				})

				// if (!this.news) {
				// 	this.news = [];
				// }

				if (this.teamId && this.teamId !== 0) {
					this.news = x.articles;
				} else {
					if (!this.news) {
						this.news = [];
					}
					if (newArticles.length > 0) {
						this.news.push(...newArticles);
					}
				}
				this.isLoading = false;
			});
	}

	getParameters(): string {
		if (this.teamId) {
			return 'team=' + this.teamId;
		}
		return 'limit=' + this.limit;
	}

	filterById(id: number): void {
		if (id === 0) {
			this.teamId = null;
		} else {
			this.teamId = id;
		}
		this.getNews();
	};

	searchChange() {
		const foundTeam = this.teamList.find(team => {
			return team.name.toLowerCase().includes(this.searchTeamNews.toLowerCase());
		});

		if (foundTeam) {
			this.filterById(foundTeam.id);
		}
	};

	filteredChange(filter: any) {
		console.log(filter);
		this.filteredTeamList = this.teamList.filter(team => {
			return team.name.toLocaleLowerCase().includes(filter.target.value.toLocaleLowerCase());
		})
	};

	onOptionSelected(option: MatAutocompleteSelectedEvent) {
		console.log(option.option.value);
		this.filterById(option.option.value.id);
	};

	displayFn(team: TeamListItem) {
		return team?.name ? team.name : '';
	};

	loadReset() {
		this.searchTeamNews = '';
		this.filteredTeamList = this.teamList;
		this.filterById(0);
	};

	loadMore() {
		this.isLoading = true;
		this.limit = this.limit + 5;
		this.getNews();
	};


	onScroll() {
		console.log('scroll');
		const scrollPosition = this.scrollContainer.nativeElement.scrollTop;
		const maxScroll = this.scrollContainer.nativeElement.scrollHeight - this.scrollContainer.nativeElement.clientHeight;

		//clearTimeout(this.intervalOnScroll);

		if (scrollPosition > maxScroll - 150 && !this.isLoading) {

				this.loadMore();
		
		}
	};
}
