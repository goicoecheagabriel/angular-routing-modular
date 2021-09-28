import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
      children: [
        {
          path: 'sales',
          component: MainComponent
        },
        {
          path: 'main',
          component: MainComponent,
        },
        {
          path: '**',
          redirectTo: ''
        }
      ],
      
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
