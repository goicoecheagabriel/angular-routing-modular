import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, AfterViewChecked, Input, OnChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-view-coords',
  templateUrl: './view-coords.component.html',
  styleUrls: ['./view-coords.component.css']
})
export class ViewCoordsComponent implements AfterViewChecked, AfterViewInit, OnChanges {

  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;
  @Input() lng!:number;
  @Input() lat!:number;
  @Input() establecer!:boolean;
  @Input() mostrar!: boolean;
  ubicacion:[ number, number ] = (this.lng == undefined || this.lat==undefined) ? [ 0, 0 ] : [ this.lng, this.lat ];
  markerHtml: HTMLElement = document.createElement('div');
  colorText: string = "#fff";
  colorBg: string = "#ff00006e";
  colorBorder: string = "ffffffb3"

  constructor() { }

  ngOnInit(){
    this.establecer = false;
    this.mostrar = false;
  }
  
  ngOnChanges(){
    // this.mapa.resize()
    console.log("CAMBIOS EN MOSTRAR",this.mostrar)

  }

  ngAfterViewChecked(){
    // this.mapa.resize()
    // Si establecer es true, significa que el modal se cerró
    if(this.establecer){
      console.log("DISPARAR CREACION MARKER");
      this.agregarMarker()
      this.establecer = false;
    }
    
    this.ubicacion = 
      (this.lng == undefined || this.lat==undefined) 
        ? [ 0, 0 ] 
        : [ this.lng, this.lat ];
    this.mapa.setCenter(this.ubicacion);
    
  }

  ngAfterViewInit(): void {
    this.crearMapa();
    
  }
  
  

  crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.ubicacion,
      zoom: 17
    })
  }

  agregarMarker() {
    let marker;
    this.crearMapa()
    this.markerHtml.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${ this.colorBg };
        color: ${ this.colorText };
        width: 30px;
        height: 30px;
        font-size: 1.5rem;
        font-weight: 700;
        padding: 20px;
        border-radius: 50%;
        border: 2px solid ${ this.colorBorder };
      ">
        <i class="las la-vr-cardboard"></i>
      </div>
    `
    marker = new mapboxgl.Marker({
      element: this.markerHtml,
      draggable: false
    })
      .setLngLat( this.mapa.getCenter() )
      .addTo( this.mapa )

    this.mostrar = true;
    
    setTimeout(() => {
      this.mapa.resize()
    }, 300);
  }


}
