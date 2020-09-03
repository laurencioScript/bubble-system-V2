import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { PropertyPageComponent } from './property-page/property-page.component';
import { PartsPageComponent } from './parts-page/parts-page.component';
import {
  AuthGuardService as AuthGuard,
  HomeGuardService as HomeGuard,
} from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'second', component: SidebarComponent, canActivate: [AuthGuard] },
  { path: 'property', component: PropertyPageComponent, canActivate: [AuthGuard] },
  { path: 'parts', component: PartsPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomePageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
