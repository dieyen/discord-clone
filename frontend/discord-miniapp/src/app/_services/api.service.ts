import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../_types/user';
import { Server } from '../_types/server';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loggedUser: User = {
    id: 0,
    email: '',
    displayName: 'Name',
    picture: ''
  };

  private REST_API_SERVER = "http://localhost:3000";
  private headers = {
    'Content-Type': 'application/json'
  }
  private selectedServer: number = 0;
  
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  setUser(id: number, email: string, displayName: string, picture: string){
    this.loggedUser.id = id;
    this.loggedUser.email = email;
    this.loggedUser.displayName = displayName;
    this.loggedUser.picture = picture;

    this.cookieService.set( 'user', JSON.stringify( this.loggedUser ) );
  }

  getUser(){
    return JSON.parse( this.cookieService.get( 'user' ) );
  }

  getRequest(){
    return this.httpClient.get( this.REST_API_SERVER ).pipe( retry(3), catchError(this.handleError) );
  }

  getUsers(){
    return this.httpClient.get( `${this.REST_API_SERVER}/users` ).pipe( retry(3), catchError(this.handleError) );
  }

  getServers(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers`).pipe( retry(3), catchError(this.handleError) );
  }

  getChannels(serverID: number){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers/${serverID}/channels` ).pipe( retry(3), catchError(this.handleError) );
  }

  getSelectedServer(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers/${this.selectedServer}`).pipe( retry(3), catchError(this.handleError) );
  }

  getSelectedServerID(){
    return this.selectedServer;
  }

  registerUser(email: string, displayName: string, picture: string, password: string){
    const body = {
      email, displayName, picture, password
    }

    return this.httpClient.post( `${this.REST_API_SERVER}/users/`, body, { headers: this.headers } )
  }

  loginUser(email: string, password: string){
    const body = {
      email, password
    }

    return this.httpClient.post<any>( `${this.REST_API_SERVER}/login`, body, { headers: this.headers } )
  }

  setSelectedServer( serverID: number ){
    this.selectedServer = serverID;
  }

  addServer(name: string, picture: string){
    const body = {
      name, picture
    }

    return this.httpClient.post( `${this.REST_API_SERVER}/servers`, body, { headers: this.headers } )
  }

  addChannel(serverID: number, name: string, description: string){
    const body = {
      name, description
    }

    return this.httpClient.post( `${this.REST_API_SERVER}/servers/${serverID}/channels`, body, { headers: this.headers } );
  }
}
