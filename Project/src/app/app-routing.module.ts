import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './pages/profile/summary/summary.component';
import { CTitleComponent } from './components/profile/c-title/c-title.component';
import { CSummaryComponent } from './components/profile/c-summary/c-summary.component';
import { EditComponent } from './pages/profile/edit/edit.component';
import { CEditComponent } from './components/profile/c-edit/c-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/questions/main/main.component';


const routes: Routes = [
  { path: 'profile/summary', component: SummaryComponent, children: [
    { path: 'title', component: CTitleComponent },
    { path: 'summary', component: CSummaryComponent },
  ]},
  { path: 'profile/edit', component: EditComponent, children: [
    { path: 'title', component: CTitleComponent },
    { path: 'edit', component: CEditComponent },
    ]},
    { path: 'login', component: LoginComponent },
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },

  { path: 'questions/main',component:MainComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

