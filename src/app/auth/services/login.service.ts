import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Token, User } from '../interfaces/auth.interface';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _baseUrl: string = environment.baseUrl;
  private _auth: Token | undefined;
  private _user: any | undefined;
  
  public get user(): any {
    return {...this._user}
  };

  constructor( private http: HttpClient ) { }


  public verificaAutenticacion():Observable<boolean> {
    
    if ( ! localStorage.getItem('token') ){
      console.log('El token no existe')
      return of(false);
    }
    
    console.log('El token SI existe')
    const oldToken = `Bearer ${localStorage.getItem('token')}`;
    return this.http.get<Token>( `${ this._baseUrl }/usuarios/renewToken`, {headers: { 'Authorization': oldToken }})
      .pipe(
        map( token => {
          this._auth = token;
          this._user = jwt_decode( token.token );
          localStorage.setItem('token', token.token);
          console.log('map', token)
          return true
        } )
      )
  }

  public signin( user: User ): Observable<Token> {

    return this.http.post<Token>( `${ this._baseUrl }/usuarios/signin`, user )
      .pipe( 
        tap( auth => this._auth = auth ),
        tap( ({token}) => {
          this._user = jwt_decode( token );
          this._user = {
            ...this._user,
            username: user.userName,
            avatar: null
          };
        }),
        tap( auth => localStorage.setItem('token', auth.token) )
      );

  }

  public signout() {
    this._user = undefined;
    this._auth = undefined;
    localStorage.removeItem('token');
  }

}
