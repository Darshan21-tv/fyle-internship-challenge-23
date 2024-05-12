// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpCacheInterceptor } from './http-cache.interceptor';

import { AppComponent } from './app.component';
import { GithubRepoListingComponent } from './github-repo-listing/github-repo-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubRepoListingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
