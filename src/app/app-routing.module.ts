import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentosComponent } from './admin-center/documentos/documentos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { FinanzasComponent } from './reportes/finanzas/finanzas.component';
import { MontadoresComponent } from './reportes/montadores/montadores.component';
import { ProduccionComponent } from './reportes/produccion/produccion.component';
import { ProductivadadComponent } from './reportes/productivadad/productivadad.component';
import { ProveedoresComponent } from './reportes/proveedores/proveedores.component';
import { UsuariosComponent } from './reportes/usuarios/usuarios.component';
import { RolesComponent } from './admin-center/roles/roles.component';
const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'usuarios',
        component: UsuariosComponent
      },
      {
        path:'roles',
        component: RolesComponent
      },
      {
        path:'produccion',
        component: ProduccionComponent
      },
      {
        path:'finanzas',
        component: FinanzasComponent
      },
      {
        path:'productividad',
        component: ProductivadadComponent
      },
      {
        path:'proveedores',
        component: ProveedoresComponent
      },
      {
        path:'montadores',
        component: MontadoresComponent
      },
      {
        path:'Upload',
        component: DocumentosComponent
      },
  ]
  },
  {
    path: '',
    component: LoginComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
