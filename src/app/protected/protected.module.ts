import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout'

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { AsideComponent } from './dashed/aside/aside.component';
import { OpenAsideBtnComponent } from './dashed/open-aside-btn/open-aside-btn.component';
import { NavbarComponent } from './dashed/navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    AsideComponent,
    OpenAsideBtnComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    LayoutModule,
  ]
})
export class ProtectedModule { }
