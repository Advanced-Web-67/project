import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SummaryComponent } from './pages/profile/summary/summary.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { CSummaryComponent } from './components/profile/c-summary/c-summary.component';
import { CEditComponent } from './components/profile/c-edit/c-edit.component';
import { CTitleComponent } from './components/profile/c-title/c-title.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { CommentMainComponent } from './components/comments/comment-main/comment-main.component';
import { ImageService } from './services/profiles/image/image.service';
import { QMainComponent } from './components/questions/q-main/q-main.component';
import { MainComponent } from './pages/questions/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SummaryComponent,
    EditComponent,
    CSummaryComponent,
    CEditComponent,
    CTitleComponent,
    LoginComponent,
    NavbarLoginComponent,
    
    CommentMainComponent,
          QMainComponent,
          MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    ImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

