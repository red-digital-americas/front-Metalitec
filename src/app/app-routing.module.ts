import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { FinanzasComponent } from './reportes/finanzas/finanzas.component';
import { ProduccionComponent } from './reportes/produccion/produccion.component';
import { ProductivadadComponent } from './reportes/productivadad/productivadad.component';

const routes: Routes = [
  {
    path: '',
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
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
