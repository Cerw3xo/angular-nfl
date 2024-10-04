import { EventComponent } from './event/event.component';
import { GamesComponent } from './games/games.component';
import { RosterComponent } from './shared/components/roster/roster.component';
import { StadiumComponent } from './stadium/stadium.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamComponent } from './teamPage/team.component';
import { Routes } from '@angular/router';
import { AthleteComponent } from './athlete/athlete.component';
import { NewsPageComponent } from './news/news-page.component';

export const routes: Routes = [
    { path: 'stadium/:id', component: StadiumComponent},
    { path: 'team/:id', component: TeamComponent},
    { path: 'roster/:id', component: RosterComponent},
    { path: '', component: TeamListComponent},
    { path: 'games', component: GamesComponent},
    { path: 'event/:id', component: EventComponent},
    { path: 'athlete/:id', component: AthleteComponent},
    { path: 'news-page', component: NewsPageComponent}
];
