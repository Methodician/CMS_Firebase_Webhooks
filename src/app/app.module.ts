import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogPreviewCardComponent } from './components/blog-preview-card/blog-preview-card.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { KeysPipe } from './shared/pipes/keys.pipe';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AdminComponent,
    BlogDetailComponent,
    BlogListComponent,
    BlogPreviewCardComponent,
    TruncatePipe,
    SafeHtmlPipe,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  constructor(){
    firebase.initializeApp(environment.fbConfig);
  }
}
