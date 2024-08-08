import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HoverHighlightDirective } from './directives/hover-highlight.directive';
import { LoadingSpinnerDirective } from './directives/loading-spinner.directive';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { UserStore } from './store/user.store';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserDetailCardComponent } from './components/user-detail-card/user-detail-card.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    HomeComponent,
    UserDetailComponent,
    HoverHighlightDirective,
    LoadingSpinnerDirective,
    DebounceClickDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    UserCardComponent,
    HeaderComponent,
    PaginationComponent,
    UserDetailCardComponent,
  ],
  providers: [UserStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
