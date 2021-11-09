import { AfterContentChecked, AfterContentInit, Component, ComponentRef, EventEmitter, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';
import { Modelo } from '../../interfaces/Modelo.interface';
import { ValidacionesService } from '../../services/modelo-existe.valid.service';
import { VirtualsService } from '../../services/virtuals.service';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit, OnChanges{

  lat!: number//43.28967149377681;
  lng!: number//-2.9866807864850955;
  display: boolean = false;
  establecer:boolean = false;
  edicion:[ boolean, string|null, Modelo|null ] = [false, null, null];//editable? | idModelo | modelo
  @Input() modelAEditar!:Modelo|null;



  
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
    private activateRouter: ActivatedRoute,
    private virtualService: VirtualsService,
    private validacionesService: ValidacionesService
    ) { 

      this.formModelo.reset({
        nombre:'',
        descripcion:'',
        latitud: this.lat,
        longitud: this.lng,
        modeloId: 'tyEb2t1RWsc'
      });
    }
  ngAfterContentInit(): void {
  }
  
  ngOnChanges(){
    console.log("MODELO A EDITAR",this.modelAEditar)
    if( this.modelAEditar ){
      const{ ubicacion } = this.modelAEditar;
      const [ longitud, latitud ] = ubicacion;
      this.formModelo.reset({ ...this.modelAEditar, latitud, longitud })
    }

  }

    ngOnInit() {
      this.edicion[0] = this.activateRouter.snapshot.params['id'] ? true : false;
      
      if( this.edicion[0] ){
        this.edicion[1] = this.activateRouter.snapshot.params['id'];
        const [,modeloId] = this.edicion;
        this.virtualService.getModelo(modeloId!)
        .subscribe( modelo => {
          const [ longitud, latitud] = modelo.ubicacion;
          this.lng = longitud;
          this.lat = latitud;
          this.edicion[2] = modelo;
          this.formModelo.reset({ ...modelo, latitud, longitud });
          localStorage.setItem('modeloAModificar',JSON.stringify(modelo))
        } );
        this.mostrarViewMap();
      }
      console.log(this.edicion);
    }

  getCoordenadas(){
    this.display = true;
    this.formModelo.controls.latitud.markAsDirty();
    }

    modificarModelo(){

      let { nombre, descripcion, modeloId:id, ...rest } = this.formModelo.value;
      nombre = nombre.toLowerCase();
      descripcion = descripcion.toLowerCase();

      this.edicion[2] = {
        _id:rest._id,
        nombre,
        descripcion,
        modeloId:id,
        ubicacion: [ rest.longitud, rest.latitud ],
        uri: environment.baseUrlMatterport
      }
      const [,modeloId, modelo] = this.edicion;


      this.virtualService.updateModelo( modeloId!, modelo! )
        .subscribe( modelo => {
          console.warn("SE REALIZÓ LA ACTUALIZACION EN EL BACKEND",modelo);
          this.router.navigateByUrl('/dashboard/virtuals/list');
        }, ( error )=> {
          console.error("RECIBIMOS UN ERROR DEL BACKEND",error)
        } )

    }

    cancelarModificacion(){
      this.router.navigateByUrl('/dashboard/virtuals/list');
    }
    
    crearNuevo(){

      if( this.formModelo.invalid ){
        this.formModelo.markAllAsTouched();
        return;
      }

      if( this.edicion[0] ){
        this.modificarModelo();
        return;
      }

      //https://my.matterport.com/show/?m=
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
          this.router.navigateByUrl('/dashboard/virtuals/list')

        }, ( error ) => {
          Swal.fire({
            title: 'Error',
            text: `Verifique que el nombre del modelo no exista ya en la base de datos (${ error.message })`,
            icon: 'error'
          })
        } )

    }
    

    actualPosition( event:[number, number] ){
      this.formModelo.get('longitud')!.setValue(event[0]);
      this.formModelo.get('latitud')!.setValue(event[1]);
      this.lng = event[0];
      this.lat = event[1];
    }

    mostrarViewMap(){
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
    