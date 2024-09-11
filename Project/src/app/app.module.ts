import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SummaryComponent } from './pages/profile/summary/summary.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { CSummaryComponent } from './components/profile/c-summary/c-summary.component';
import { CEditComponent } from './components/profile/c-edit/c-edit.component';
import { CTitleComponent } from './components/profile/c-title/c-title.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
