import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { HttpClientModule } from '@angular/common/http';
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
import { RegisterComponent } from './pages/register/register.component';
import { QMainComponent } from './components/questions/q-main/q-main.component';
import { MainComponent } from './pages/questions/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MyQuestionsComponent } from './pages/my-questions/my-questions.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { QuestionsDetailComponent } from './pages/questions/questions-detail/questions-detail.component';
import { QadataService } from './services/profiles/qadata/qadata.service';


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

    MyQuestionsComponent,
    
    CommentMainComponent,
          RegisterComponent,
          QMainComponent,
          MainComponent,
          UserListComponent,
          QuestionsDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', 
      timeOut: 2000, 
      closeButton: false, 
      progressBar: true, 
    }),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    ImageService,
    QadataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

