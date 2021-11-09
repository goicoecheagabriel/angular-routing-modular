import { Component, OnInit } from '@angular/core';
import { Modelo } from '../../interfaces/Modelo.interface';
import { VirtualsService } from '../../services/virtuals.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  modelos: Modelo[] = [];
  loading: boolean = true;
  error: string | null = null;
  // dialogVisible:boolean = false;
  modelAEditar:Modelo | null = null;
  // modelo: Modelo | null = null;

  constructor(
    private virtualService: VirtualsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.virtualService.getModelos()
      .subscribe( m =>{
          setTimeout(() => {
            this.modelos = m;
            this.loading = false;
          }, 1000);
        }, 
        e => {
          const message = `ACCESO DENEGADO: ${ e.error.message }`
          console.error(message);
          this.error = message;
        }
      )

  }

  eliminar(modelo: Modelo){
    Swal.fire({
      // title: '¿ELIMINAR MODELO?',
      // titleText:_id,
      html:`
        <div>
          <strong>
            ¿ELIMINAR MODELO?
          </strong>
        </div>
        <div style="padding-top:.5rem">${modelo.nombre}</div>
        <div style="padding-bottom:.5rem;font-size:.6rem;">${modelo._id}</div>
        <div style="font-size:.8rem; color: var(--color-warning-bg)">Esta acción no se puede deshacer</div>
      `,
      timer: 6000,
      timerProgressBar: true,
      icon:'error',
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      focusCancel: true,
      customClass: {
        confirmButton: 'swal-btn-eliminar',
        cancelButton: 'swal-btn-cancelar',
        icon: 'swal-icon-cancelar',
      },
      confirmButtonText:`
        <i _ngcontent-rrb-c24="" class="las la-trash-alt"></i>
          Eliminar
      `,
      cancelButtonText: `
        <i class="las la-ban"></i>
          Cancelar
      `
    })
      .then( result => {
        if ( result.isDismissed ){
          console.log("Accion cancelada", result);
          return;
        }
        
        this.virtualService.deleteModelo( modelo._id )
          .subscribe( 
            m => {
              this.modelos = this.modelos.filter( modelo => modelo._id !== m?.data._id);
            },
            e=> {
              console.error('ERRORES AL ELIMINAR',e)
              
            }
            
          )
          
      } )
      
  }

  editar(modelo: Modelo){
    
    const id: string | null= modelo ? modelo._id : null;
    this.modelAEditar = modelo;
    console.log("editar",id)
    this.router.navigate( [ `/dashboard/virtuals/edit/${ id }` ] )
    // this.dialogVisible = true;
  }

  mapa(modelo: Modelo){
    console.log("ver mapa",modelo._id)
  }

  cerrarModal(){

  }

 

}
