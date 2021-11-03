import { NgModule } from '@angular/core';

// primeNg
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



@NgModule({
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    MessageModule,
    MessagesModule
  ]
})
export class PrimeNgModule { }
