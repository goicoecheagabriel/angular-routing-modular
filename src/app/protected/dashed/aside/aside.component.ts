import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashedService } from '../dashed.service';
import { AsideEstado, AsideModel } from '../interfaces/dashed.interface';

import { asideConfig } from '../config/aside.config'


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  
  @ViewChild('menu',{static:true}) menu!:ElementRef;
  public asideModel!: AsideModel;
  public asideEstado!: AsideEstado;

  constructor( 
    private dashed: DashedService ) { }

  ngOnInit(): void {
    // this.aside = this.dashed.getAside();
 
    this.dashed.verificarBreakPointAside( this.menu )
    this.crearAside();

  }
  
  public close(){
    this.dashed.asideClose( this.menu )
  }

  public miniAside(){
    console.log("Minimizado")
  }

  ngDoCheck(): void {
    this.asideEstado = this.dashed.getAside();
  }

  crearAside(){
    this.asideModel = asideConfig;
  }

}
