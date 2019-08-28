import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './Components/Players/player/player.component';
import { PlayerAddComponent } from './Components/Players/player-add/player-add.component';
import { PlayerEditComponent } from './Components/Players/player-edit/player-edit.component';
import { TeamComponent } from './Components/Teams/team/team.component';
import { TeamAddComponent } from './Components/Teams/team-add/team-add.component';
import { TeamEditComponent } from './Components/Teams/team-edit/team-edit.component';
import { MatNativeDateModule, MatFormFieldModule, MatListModule, MatCardModule, MatTableModule, MatIconModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuditConfigurationComponent } from './Components/Audit/audit-configuration/audit-configuration.component';
import { AuditListComponent } from './Components/Audit/audit-list/audit-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PlayerComponent,
    PlayerAddComponent,
    PlayerEditComponent,
    TeamComponent,
    TeamAddComponent,
    TeamEditComponent,
    AuditConfigurationComponent,
    AuditListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: PlayerComponent, pathMatch: 'full' },
      { path: 'players', component: PlayerComponent, pathMatch: 'full' },
      { path: 'player-add', component: PlayerEditComponent, pathMatch: 'full' },
      { path: 'player-edit/:id', component: PlayerEditComponent, pathMatch: 'full' },
      { path: 'teams', component: TeamComponent, pathMatch: 'full' },
      { path: 'team-add', component: TeamEditComponent, pathMatch: 'full' },
      { path: 'team-edit/:id', component: TeamEditComponent, pathMatch: 'full' },
      { path: 'audit-configuration', component: AuditConfigurationComponent, pathMatch: 'full' },
      { path: 'audit-list', component: AuditListComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
