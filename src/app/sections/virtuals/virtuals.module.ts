import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeNg
import {PrimeNgModule} from './prime-ng.module'

// SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Modulos y Componentes personalizados
import { VirtualsRoutingModule } from './virtuals-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ListarComponent } from './pages/listar/listar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { LoadingComponent } from '../../protected/dashed/loading/loading.component';
import { TituloComponent } from './dashed/titulo/titulo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetCoordsComponent } from './pages/get-coords/get-coords.component';



@NgModule({
  declarations: [
    HomeComponent,
    ListarComponent,
    NuevoComponent,
    LoadingComponent,
    TituloComponent,
    GetCoordsComponent
  ],
  imports: [
    CommonModule,
    VirtualsRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ]
})
export class VirtualsModule { }
