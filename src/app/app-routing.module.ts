import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { PropertyPageComponent } from './property-page/property-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'second', component: SidebarComponent },
  { path: 'property', component: PropertyPageComponent },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
