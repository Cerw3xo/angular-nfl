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
import { SearchResult, TypeResult } from '../models/search-result';

@Component({
	selector: 'search-page',
	standalone: true,
	imports: [RouterModule, RosterComponent, CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatIcon, MatIconButton, MatIconModule, MatSuffix, LoadingSpinnerComponent, LoadingSpinnerComponent],
	providers: [TeamService],
	templateUrl: './search-page.component.html',
	styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
	@ViewChild('scrollContainer') scrollContainer: ElementRef;

	title = 'app';
	searchResult: SearchResult;
	playersResult: TypeResult;
	isLoading: boolean = false;

	constructor(private htttpClient: HttpClient, private route: ActivatedRoute, private teamService: TeamService) {

	}


	getSearch(event: any): void {
		console.log(event);
		this.isLoading = true;
		this.htttpClient
			.get<SearchResult>(
				'https://site.web.api.espn.com/apis/search/v2?query=' + event.target.value.toLocaleLowerCase() + '&limit=100'
			)
			.subscribe((searchResult) => {
				this.searchResult = searchResult;
				this.getPlayers();
				

				this.isLoading = false;
			});
	}

	getPlayers() {
		this.playersResult = this.searchResult?.results?.find((result) => result.type == 'player');	
	}

}