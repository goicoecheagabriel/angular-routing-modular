import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AsyncValidator, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Modelo } from '../interfaces/Modelo.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService implements AsyncValidator {

  
  constructor( 
    private http: HttpClient,
    private activateRouter: ActivatedRoute,
   ){}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const modeloAModificar = localStorage.getItem('modeloAModificar');
    let modelo: Modelo | null = JSON.parse(modeloAModificar!) || null;

    const value: FormControl = control.value.toLowerCase();
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `${ environment.semillaBearer } ${ token }`
      }
    }
    
    return this.http.get<any>( `${ environment.baseUrl }/virtuals/modelos/modeloexiste/${ value }`, options )
      .pipe(
        map( res => {
          if( res.exists == false ){
            return null
          }else if( modelo ){
            console.log(res, modelo.nombre)
            if( control.value.toLowerCase() == modelo.nombre ){
              return null
            }
          }
          return { ...res }
        } )
      );

    }
}
