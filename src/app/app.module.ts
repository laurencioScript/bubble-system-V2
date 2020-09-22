import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID  } from '@angular/core';

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
import { PartsPageComponent } from './parts-page/parts-page.component';
import { FormsPartsComponent } from './parts-page/forms-parts/forms-parts.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard'; 


import { PropertyService } from './service/property.service';
import { UserService } from './service/user.service';
import { PartsService } from './service/parts.service';
import { FormsReadjustComponent } from './parts-page/forms-readjust/forms-readjust.component';
import { UsersComponent } from './users/users.component';
import { UserSelectionComponent } from './users/user-selection/user-selection.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ConfimActionComponent } from './users/user-selection/confim-action/confim-action.component';
import { FormResetPasswordComponent } from './users/user-selection/form-reset-password/form-reset-password.component';

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
    FormsPartsComponent,
    FormsReadjustComponent,
    UsersComponent,
    UserSelectionComponent,
    ConfimActionComponent,
    FormResetPasswordComponent,
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
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    ClipboardModule,
  ],
  providers: [PropertyService, UserService, PartsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
