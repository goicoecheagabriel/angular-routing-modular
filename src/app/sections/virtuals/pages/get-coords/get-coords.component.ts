import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output() actualPosition = new EventEmitter<[number,number]>();
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
  }

  ngAfterViewChecked(){
    this.mapa.resize()

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
      this.actualPosition.emit([lng,lat]);
    })

  }

}
