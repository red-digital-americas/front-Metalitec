import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ProduccionComponent } from './reportes/produccion/produccion.component';
import { FinanzasComponent } from './reportes/finanzas/finanzas.component';
import { ProductivadadComponent } from './reportes/productivadad/productivadad.component';
import { ProveedoresComponent } from './reportes/proveedores/proveedores.component';
import { MontadoresComponent } from './reportes/montadores/montadores.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UsuariosComponent } from './reportes/usuarios/usuarios.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AvatarModule } from 'ngx-avatar';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateUserComponent } from './reportes/dialog/create-user/create-user.component';
import { DialogGeneralMessageComponent } from './reportes/dialog/dialog-general-message/dialog-general-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GeneralConfirmacionComponent } from './reportes/dialog/general-confirmacion/general-confirmacion.component';
import { DialogMessageComponent } from './dialog/dialog-message/dialog-message.component';
import { MatRippleModule } from '@angular/material/core';
import { DocumentosComponent } from './admin-center/documentos/documentos.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatSelectModule } from '@angular/material/select';
import { DialogChangePasswordComponent } from './reportes/dialog/dialog-change-password/dialog-change-password.component';
import { RolesComponent } from './admin-center/roles/roles.component';
import { DialogAddRoleUserComponent } from './dialog/dialog-add-role-user/dialog-add-role-user.component';
import { DialogGeneralConfirmationComponent } from './dialog/dialog-general-confirmation/dialog-general-confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    ProduccionComponent,
    FinanzasComponent,
    ProductivadadComponent,
    ProveedoresComponent,
    MontadoresComponent,
    LoginComponent,
    UsuariosComponent,
    HeaderComponent,
    DashboardComponent,
    CreateUserComponent,
    DialogGeneralMessageComponent,
    GeneralConfirmacionComponent,
    DialogMessageComponent, 
    DocumentosComponent, DialogChangePasswordComponent, RolesComponent, DialogAddRoleUserComponent, DialogGeneralConfirmationComponent
  ],
  imports: [
    MatSelectModule,
    NgxFileDropModule,
    MatRippleModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    AvatarModule,
    MatTabsModule,
    MatExpansionModule,
    NgxSpinnerModule,
    MatTooltipModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
