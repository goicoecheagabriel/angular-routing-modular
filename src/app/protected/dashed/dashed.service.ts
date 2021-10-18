import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ElementRef, Injectable } from '@angular/core';

import { AsideEstado } from './interfaces/dashed.interface';

@Injectable({
  providedIn: 'root'
})
export class DashedService {

  // @ViewChild('menu') menu!: ElementRef;

  private _aside: AsideEstado = {
    flotar: true,
    open: true,
    minimizado: false
  }

  constructor( 
    private _bpo: BreakpointObserver
   ) { }

  public setAside ( props: AsideEstado ) {
    this._aside = {...props};
  }

  public setFlotarAside ( flotar: boolean ) {
    this._aside.flotar = flotar;
  }

  public setOpenAside ( open: boolean ) {
    this._aside.open = open;
  }

  public setMinimizadoAside ( minimizado: boolean ) {
    this._aside.minimizado = minimizado;
  }

  public getAside () {
    return this._aside;
  }

  // Dependiendo del breakpoint ajusta el css para mostrar el aside inicialmente
  public verificarBreakPointAside( aside: ElementRef ) {
    this._aside.aside = aside.nativeElement;
    // console.log("pasamos por aca", menu)
    // console.log("leemos el _aside", this._aside)
    this._bpo
      .observe(['(min-width: 768px)'])
      .subscribe( ( state: BreakpointState ) => {
        // console.log(state)
        let nuevoEstado = {};

        if ( state.matches ) {
            aside.nativeElement.style = `
            transform: translateX(0);
            `
            aside.nativeElement.parentNode.style = `
              width: ${aside.nativeElement.clientWidth + 'px'}
            `
      
            nuevoEstado = {
              flotar: false,
              open: true,
              minimizado: false,
            }
            this._aside = {...this._aside, ...nuevoEstado}
            
          } else {
            aside.nativeElement.style = `
            transform: translateX(0);
            min-width: 200px;
            `

            aside.nativeElement.parentNode.style = `
              width: auto;
            `
            nuevoEstado = {
              flotar: true,
              open: true,
              minimizado: false,
            }
            this._aside = {...this._aside,...nuevoEstado}
        }
      } )
  }

  public asideClose (menu: ElementRef) {
    menu.nativeElement.style = `
      transform: translateX(-120%)
    `;
    this.setOpenAside(false);
  }

  public asideOpen (btnOpen: ElementRef){
    if( !this._aside.aside ){
      console.warn("No se puede abrir el Aside", this._aside)
      return;
    } 
    this._aside.aside.style = "transform: translateX(0)";
    this.setOpenAside(true);
    console.log("Abriendo desde Service", btnOpen, this._aside)
  }

  public asideToggleMinimize(valor?: boolean):boolean {
    if (valor){
      this._aside.minimizado = valor;
    }
    
    this._aside.minimizado = !this._aside.minimizado;
    
    return this._aside.minimizado;
  }
  

}
