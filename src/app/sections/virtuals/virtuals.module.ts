import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualsRoutingModule } from './virtuals-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListarComponent } from './pages/listar/listar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { LoadingComponent } from '../../protected/dashed/loading/loading.component';
import { TituloComponent } from './dashed/titulo/titulo.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListarComponent,
    NuevoComponent,
    LoadingComponent,
    TituloComponent
  ],
  imports: [
    CommonModule,
    VirtualsRoutingModule
  ]
})
export class VirtualsModule { }
