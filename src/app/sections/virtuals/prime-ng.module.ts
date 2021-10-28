import { NgModule } from '@angular/core';

// primeNg
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'


@NgModule({
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
  ]
})
export class PrimeNgModule { }
