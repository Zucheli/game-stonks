import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { PubliComponent } from './components/partials/publi/publi.component';
import { PlayersComponent } from './components/players/players.component';
import { TrainingComponent } from './components/training/training.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    JobsComponent,
    HeaderComponent,
    PubliComponent,
    PlayersComponent,
    TrainingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
