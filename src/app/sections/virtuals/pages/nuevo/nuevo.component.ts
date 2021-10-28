import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { VirtualsService } from '../../services/virtuals.service';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent {

  
  lat: number = 90;
  lng: number = 89;
  display: boolean = false;

  
  formModelo: FormGroup = this.fb.group({
    nombre: [null,[ Validators.required, Validators.minLength(5), Validators.maxLength(15) ]],
    descripcion: ['Descripcion', [ Validators.required, Validators.minLength(7), Validators.maxLength(50) ]],
    latitud: [ null, [ Validators.required ] ],
    longitud: [ null, [ Validators.required ] ],
    uri: [ null, [ Validators.required, Validators.pattern("^(https:)\/\/my\.matterport\.com\/show\/[\?]{1}m=[a-zA-Z0-9]{11}$") ] ]
  })
  
  constructor(
    private fb: FormBuilder,
    private virtualService: VirtualsService
    ) { 
      this.formModelo.reset({
        nombre:'Gabriel',
        descripcion:'Descripcion',
        latitud: this.lat,
        longitud: this.lng,
        uri: 'https://my.matterport.com/show/?m=tyEb2t1RWsc'
      });
    }
    
    getCoordenadas(){
      
      this.display = true;
      if( this.virtualService.ubicacion ){
        this.formModelo.get('latitud')?.setValue(44)
        this.formModelo.get('longitud')?.setValue(44)
      }
      // Swal.fire({
        //   html: '<app-get-coords></app-get-coords>'
        // });
      }
      
      crearNuevo(){
        console.log("Crea nuevo modelo")
      }
      
      showDialog() {
        console.log("Hacemos Click en el showDialog", this.display)
      }
      
      
    }
    