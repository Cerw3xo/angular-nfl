import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import {
  ActivatedRoute,
  RouterModule,
  RouterOutlet,
  RouterLink,
} from '@angular/router';
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
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Division } from '../enums/divisions';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import {
  ArticleResult,
  ClipsResult,
  PlayerResult,
  SearchResult,
  TypeResult,
} from '../models/search-result';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'search-page',
  standalone: true,
  imports: [
    RouterModule,
    RosterComponent,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIcon,
    MatIconButton,
    MatIconModule,
    MatSuffix,
    LoadingSpinnerComponent,
    LoadingSpinnerComponent,
  ],
  providers: [TeamService],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  title = 'app';
  searchResult: SearchResult;
  playersResult: TypeResult<PlayerResult>;
  articleResult: TypeResult<ArticleResult>;
  clipResult: TypeResult<ClipsResult>;
  isLoading: boolean = false;
  timeoutDebouncer: any;
  selectedTab: string = 'player';
  searchQuery: string = ''
  totalResults: number = 0;

  constructor(
    private htttpClient: HttpClient,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  // ngOnInit(): void {
  //   const savedQuery = localStorage.getItem('searchQuery');
  //   const savedResult = localStorage.getItem('searchResult')


  //   if (savedQuery && savedResult) {
  //     this.searchQuery = savedQuery;
  //     this.searchResult = JSON.parse(savedResult);
  //     this.getPlayers();
  //     this.getArticles();
  //     this.getClips();
  //   } else if ( savedQuery) {
  //     this.searchQuery = savedQuery;
  //     this.getSearch({ target: { value: savedQuery}});
  //   }
  // }



  getSearch(event: any): void {
    // const query = event.target.value;
    // this.searchQuery = query;
    // localStorage.setItem('searchQuery', query);
    if (this.timeoutDebouncer) {
      clearTimeout(this.timeoutDebouncer);
    }
    this.timeoutDebouncer = setTimeout(() => {
      this.isLoading = true;
      this.htttpClient
        .get<SearchResult>(
          'https://site.web.api.espn.com/apis/search/v2?query=' +
            event.target.value.toLocaleLowerCase() +
            '&limit=100'
        )
        .subscribe((searchResult) => {

          this.searchResult = {
            ...searchResult,
            results: searchResult.results?.map((result) => ({
              ...result,
              contents: result.contents,
            })),
          };
         
          // localStorage.setItem( 'searchResult', JSON.stringify(this.searchResult));
          this.getPlayers();
          this.getArticles();
          this.getClips();
          this.isLoading = false;

        });
    }, 500);
  }

  updateSearchquer(event: any): void {
    localStorage.setItem('searchQuery', event.target.value);
    this.getSearch(event)
  }

  getPlayers() {
    this.playersResult = <TypeResult<PlayerResult>>(
      this.searchResult?.results?.find((result) => result.type == 'player')
    );
    this.totalResults = this.searchResult.results.length;

  }

  getArticles() {
    this.articleResult = <TypeResult<ArticleResult>>(
      this.searchResult?.results?.find((result) => result.type == 'article')
    );
  }

  getClips() {
    this.clipResult = <TypeResult<ClipsResult>>(
      this.searchResult?.results?.find((result) => result.type == 'clips')
    );
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
