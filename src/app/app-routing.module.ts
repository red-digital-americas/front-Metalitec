import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { FinanzasComponent } from './reportes/finanzas/finanzas.component';
import { MontadoresComponent } from './reportes/montadores/montadores.component';
import { ProduccionComponent } from './reportes/produccion/produccion.component';
import { ProductivadadComponent } from './reportes/productivadad/productivadad.component';
import { ProveedoresComponent } from './reportes/proveedores/proveedores.component';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children:[
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
