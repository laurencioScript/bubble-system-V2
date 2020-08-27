import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './home-page/home-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PropertyPageComponent } from './property-page/property-page.component';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { SimpleModalComponent } from './simple-table/simple-modal/simple-modal.component';
import { PropertyService } from './service/property.service';
import { UserService } from './service/user.service';
import { PartsPageComponent } from './parts-page/parts-page.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomePageComponent,
    LoginComponent,
    PropertyPageComponent,
    SimpleTableComponent,
    SimpleModalComponent,
    PartsPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  providers: [PropertyService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
