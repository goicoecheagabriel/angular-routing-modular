import { Component, ComponentRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';
import { Modelo } from '../../interfaces/Modelo.interface';
import { ValidacionesService } from '../../services/validaciones.service';
import { VirtualsService } from '../../services/virtuals.service';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit{

  lat!: number//43.28967149377681;
  lng!: number//-2.9866807864850955;
  display: boolean = false;
  establecer:boolean = false;

  
  formModelo: FormGroup = this.fb.group({
    nombre: [null,[ Validators.required, Validators.pattern('[a-zA-Z]{5,15}') ], [ this.validacionesService ]],
    descripcion: ['Descripcion', [ Validators.required, Validators.minLength(7), Validators.maxLength(50) ]],
    latitud: [ null, [ Validators.required, Validators.min(0.1) ] ],
    longitud: [ null, [ Validators.required ] ],
    modeloId: [ null, [ Validators.required, Validators.pattern("^[a-zA-Z0-9]{11}$") ] ]
    // uri: [ null, [ Validators.required, Validators.pattern("^(https:)\/\/my\.matterport\.com\/show\/[\?]{1}m=[a-zA-Z0-9]{11}$") ] ]
  })
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private virtualService: VirtualsService,
    private validacionesService: ValidacionesService,
    ) { 
      this.formModelo.reset({
        nombre:'',
        descripcion:'',
        latitud: this.lat,
        longitud: this.lng,
        modeloId: 'tyEb2t1RWsc'
      });
    }

    ngOnInit() {}



    
  getCoordenadas(){
    
    this.display = true;
  
    // Swal.fire({
      //   html: '<app-get-coords></app-get-coords>'
      // });
    }
    
    crearNuevo(){
      if( this.formModelo.invalid ){
        this.formModelo.markAllAsTouched();
        return;
      }
      //https://my.matterport.com/show/?m=
      console.log("Crea nuevo modelo")
      let { nombre, descripcion, modeloId, ...rest } = this.formModelo.value;
      nombre = nombre.toLowerCase();
      descripcion = descripcion.toLowerCase();

      const newModelo = {
        nombre,
        descripcion,
        modeloId,
        ubicacion: [ rest.longitud, rest.latitud ],
        uri: environment.baseUrlMatterport
      }

      
      this.virtualService.createModelo( newModelo )
      .subscribe( m => {
          console.log(m)
          this.router.navigateByUrl('/dashboard/virtuals/list')

        }, ( error ) => {
          Swal.fire({
            title: 'Error',
            text: `Verifique que el nombre del modelo no exista ya en la base de datos (${ error.message })`,
            icon: 'error'
          })
        } )

      // this.router.onSameUrlNavigation = 'reload'
      // this.formModelo.reset({
      //   lng: '',
      //   lat: '',
      //   nombre:'',
      //   descripcion:'',
      //   modeloId: ''
      // })
    }
    
    showDialog() {
      console.log("Hacemos Click en el showDialog")
    }

    actualPosition( event:[number, number] ){
      this.formModelo.get('longitud')!.setValue(event[0]);
      this.formModelo.get('latitud')!.setValue(event[1]);
      this.lng = event[0];
      this.lat = event[1];
    }

    cerrarModal(){
      this.establecer = true;
      setTimeout(() => {
        this.establecer = false;
      }, 300);
    }

    campoInvalido(campo:string):boolean{
      return this.formModelo.controls[campo].invalid 
        && this.formModelo.controls[campo].touched;
    }
      
    }
    