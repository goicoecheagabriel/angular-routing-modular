import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment'
import { Modelo } from '../interfaces/Modelo.interface';

@Injectable({
  providedIn: 'root'
})
export class VirtualsService {
  private _baseUrl: string = environment.baseUrl;
  private _token: string | null = '';

  constructor(
    private httpService: HttpClient,
    
  ) { 
  }
  
  getModelos ():Observable<Modelo[]> {
      this._token = localStorage.getItem('token');
      const options = {
        headers: {
          Authorization: `Bearer ${this._token}`
        }
      }

      return this.httpService.get<Modelo[]>(`${ this._baseUrl }/virtuals/modelos`,options);
    }

    getModelo( modeloId: string ):Observable<Modelo> {
      this._token = localStorage.getItem('token');
      const options = {
        headers: {
          Authorization: `Bearer ${this._token}`
        }
      }

      return this.httpService.get<Modelo>( `${ this._baseUrl }/virtuals/modelos/${ modeloId }`,options );
    }

  deleteModelo(_id:string):Observable<Modelo | any> {
    const options = {
      headers: {
        Authorization: `Bearer ${this._token}`
      }
    }

    return this.httpService.delete<Modelo | any>(`${ this._baseUrl }/virtuals/modelo/${ _id }`,options);
  }

  createModelo( newModelo: Object ):Observable<Modelo> {
    this._token = localStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `${ environment.semillaBearer } ${this._token}`
      }
    }

    return this.httpService.post<Modelo>( `${ this._baseUrl }/virtuals/modelos/`,newModelo, options, );
  }

  updateModelo( id: string, modelo:Modelo ):Observable<Modelo> {
    this._token = localStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `${ environment.semillaBearer } ${ this._token }`
      }
    }

    return this.httpService.put<Modelo>( `${ this._baseUrl }/virtuals/modelos/${ id }`,modelo, options );
  }

  // modeloExiste( nombre: string ):Observable<any>{
  //   this._token = localStorage.getItem('token');
  //   const options = {
  //     headers: {
  //       Authorization: `${ environment.semillaBearer } ${ this._token }`
  //     }
  //   }

  //   return this.httpService.get<any>( `${ this._baseUrl }/virtuals/modelos/${ nombre }`, options );
  // }

}
