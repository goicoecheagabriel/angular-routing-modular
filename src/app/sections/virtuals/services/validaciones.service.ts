import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AsyncValidator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { VirtualsService } from './virtuals.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService implements AsyncValidator {

  
  constructor( 
    private http: HttpClient
   ){}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value: FormControl = control.value;
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `${ environment.semillaBearer } ${ token }`
      }
    }
    
    return this.http.get<any>( `${ environment.baseUrl }/virtuals/modelos/${ value }`, options )
      .pipe(
        map( res => {
          return ( res.exists == false )
            ? null
            : { ...res}
        } )
      );

  }

  // public modeloExistente( controlModelo: FormControl ): ValidationErrors | null {
    
    
  //   const valor: string = controlModelo.value?.trim().toLowerCase() || "";
 

  //   if( valor == 'modelo' ){

      

  //     return { invalid: 'El modelo se encuentra registrado' }
  //   }
  //   return null;
  // }
}
