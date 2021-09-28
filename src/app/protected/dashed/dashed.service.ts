import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { AsideEstado } from './interfaces/dashed.interface';

@Injectable({
  providedIn: 'root'
})
export class DashedService {

  @ViewChild('menu') menu!: ElementRef;

  private _aside: AsideEstado = {
    flotar: true,
    open: true,
    minimizado: false,
  }

  constructor( 
    private _bpo: BreakpointObserver
   ) { }

  public setAside ( props: AsideEstado ) {
    this._aside = props;
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
  public verificarBreakPointAside( menu: ElementRef ) {
    this._bpo
      .observe(['(min-width: 768px)'])
      .subscribe( ( state: BreakpointState ) => {
        console.log(state)
        if ( state.matches ) {
            menu.nativeElement.style = `
            transform: translateX(0);
            min-width: 42px;
            position: relative;
            `
            this._aside = {
              flotar: false,
              open: true,
              minimizado: false,
            }

        } else {
            menu.nativeElement.style = `
            transform: translateX(0);
            min-width: 200px;
            position: absolute
            `  
            this._aside = {
              flotar: true,
              open: true,
              minimizado: false,
            }
        }
      } )
  }

  public asideClose (menu: ElementRef) {
    menu.nativeElement.style = `
      transform: translateX(-120%)
    `
  }

  public asideToggleMinimize(valor?: boolean):boolean {
    if (valor){
      this._aside.minimizado = valor;
    }
    
    this._aside.minimizado = !this._aside.minimizado;
    
    return this._aside.minimizado;
  }
  

}
