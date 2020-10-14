import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { NgxMaskModule } from 'ngx-mask';

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
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from '@angular/material/stepper';

import { PropertyService } from './service/property.service';
import { UserService } from './service/user.service';
import { PartsService } from './service/parts.service';
import { FormsReadjustComponent } from './parts-page/forms-readjust/forms-readjust.component';
import { UsersComponent } from './users/users.component';
import { UserSelectionComponent } from './users/user-selection/user-selection.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ConfimActionComponent } from './users/user-selection/confim-action/confim-action.component';
import { FormResetPasswordComponent as FormResetProfile } from './profile-page/form-reset-password/form-reset-password.component';
import { FormResetPasswordComponent } from './users/user-selection/form-reset-password/form-reset-password.component';

import { AuthService } from './auth/auth.service';
import { AuthGuardService, HomeGuardService } from './auth/auth-guard.service';
import { ClientPageComponent } from './client-page/client-page.component';
import { FormsClientComponent } from './client-page/forms-client/forms-client.component';
import { ClientService } from './service/client.service';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormUserComponent } from './profile-page/form-user/form-user.component';
import { SalePageComponent } from './sale-page/sale-page.component';
import { NewSaleComponent } from './sale-page/new-sale/new-sale.component';
import { SaleClientComponent } from './sale-page/new-sale/shared/sale-client/sale-client.component';
import { SalePartComponent } from './sale-page/new-sale/shared/sale-part/sale-part.component';
import { SaleSchedulingComponent } from './sale-page/new-sale/shared/sale-scheduling/sale-scheduling.component';
import { SalePaymentComponent } from './sale-page/new-sale/shared/sale-payment/sale-payment.component';
import { NewPartComponent } from './sale-page/new-sale/shared/sale-part/new-part/new-part.component';
import { EditSaleComponent } from './sale-page/edit-sale/edit-sale.component';
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
    FormResetProfile,
    ClientPageComponent,
    FormsClientComponent,
    ProfilePageComponent,
    FormUserComponent,
    SalePageComponent,
    NewSaleComponent,
    SaleClientComponent,
    SalePartComponent,
    SaleSchedulingComponent,
    SalePaymentComponent,
    NewPartComponent,
    EditSaleComponent,
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
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    ColorSketchModule,
    MatStepperModule,
  ],
  providers: [
    PropertyService, 
    PartsService,
    UserService, 
    AuthService,
    AuthGuardService,
    HomeGuardService,
    ClientService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
