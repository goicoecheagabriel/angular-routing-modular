import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { VirtualsService } from '../../services/virtuals.service';


@Component({
  selector: 'app-get-coords',
  templateUrl: './get-coords.component.html',
  styleUrls: ['./get-coords.component.css']
})
export class GetCoordsComponent implements AfterViewInit, AfterViewChecked {

  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;
  @Input('lat') lat!: number // 43.296151;
  @Input('lng') lng!: number //= -2.978565;
  @Input('visible') visible!: boolean;
  ubicacion:[number,number] = [0,0]
  
  
  constructor(
    private virtualService: VirtualsService,
  ) { }
  
  ngAfterViewInit(){
    !this.lat ? this.lat = 43.296151: false;
    !this.lng ? this.lng = -2.978565: false;
    this.visible == undefined ? this.visible = true: this.visible = false;
    this.ubicacion = [this.lng, this.lat]

    if( !this.visible ){
      console.log(this.visible)
      this.divMapa.nativeElement.parentNode.style = "display: none"
    }

    this.createMapa(); 
    console.log(this.lat, this.lng)
  }

  ngAfterViewChecked(){
    this.mapa.resize()

  }

  ngDoCheck() {
    this.ubicacion = this.virtualService.ubicacion || this.ubicacion
    console.log("Servicio de Ubicacion",this.virtualService.ubicacion)
  }

  createMapa(){
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.ubicacion,
      zoom: 17,
      
    })

    this.mapa.on('moveend',()=>{
      const {lng, lat} = this.mapa.getCenter()
      console.log([lng, lat])
      this.virtualService.setUbicacion([lng, lat])
    })

  }




}
