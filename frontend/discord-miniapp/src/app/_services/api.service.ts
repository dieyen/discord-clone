import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../_types/user';
import { Server } from '../_types/server';

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loggedUser: User = {
    userID: '',
    email: '',
    displayName: 'Name',
    picture: ''
  };
  
  usersList: User[] = [];
  rolesList: any = [];

  private REST_API_SERVER = environment.apiUrl;
  private headers = {
    'Content-Type': 'application/json'
  }
  private selectedServer: string = '';
  
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

  setUser(id: string, email: string, displayName: string, picture: string){
    this.loggedUser.userID = id;
    this.loggedUser.email = email;
    this.loggedUser.displayName = displayName;
    this.loggedUser.picture = picture;

    this.cookieService.set( 'user', JSON.stringify( this.loggedUser ) );
  }

  getUsersList(){
    // console.log( this.usersList );
    return this.usersList;
  }
  
  getUser(){
    return JSON.parse( this.cookieService.get( 'user' ) );
  }

  getRequest(){
    return this.httpClient.get( this.REST_API_SERVER ).pipe( retry(3), catchError(this.handleError) );
  }

  getUsers(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/users`, { headers: this.headers } ).pipe( retry(3), catchError(this.handleError) );
  }

  getUsersNotInServer(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers/${this.selectedServer}/users/invite`, { headers: this.headers } ).pipe( retry(3), catchError(this.handleError) );
  }

  getServers(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers`).pipe( retry(3), catchError(this.handleError) );
  }

  getChannels(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers/${this.selectedServer}/channels` ).pipe( retry(3), catchError(this.handleError) );
  }

  getUsersInServer(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers/${this.selectedServer}/users`).pipe( retry(3), catchError(this.handleError) );
  }

  getRolesInServer(){
    return this.httpClient.get<any>( `${this.REST_API_SERVER}/servers/${this.selectedServer}/roles`).pipe( retry(3), catchError(this.handleError) );
  }

  getSelectedServerID(){
    return this.selectedServer;
  }

  setUsers(){
    this.getUsers().subscribe(
      (val) => {
        this.usersList = val.data;
      }
    );
  }

  setRoles(){
    this.getRolesInServer().subscribe(
      (val) => {
        this.rolesList = val.data;
      }
    )
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

  setSelectedServer( serverID: string ){
    this.selectedServer = serverID;
  }

  addServer(name: string, picture: string){
    const body = {
      name, picture
    }

    return this.httpClient.post( `${this.REST_API_SERVER}/servers`, body, { headers: this.headers } )
  }

  addChannel(serverID: string, name: string, description: string){
    const body = {
      name, description,
      role: []
    }

    return this.httpClient.post( `${this.REST_API_SERVER}/servers/${serverID}/channels`, body, { headers: this.headers } );
  }

  addRole( serverID: string, name: string, isAdmin: boolean ){
    const body = {
      name, isAdmin
    }

    return this.httpClient.post( `${this.REST_API_SERVER}/servers/${serverID}/roles`, body, { headers: this.headers } );
  }

  addUserToServer( serverID: string, userID: string, role: string ){
    const body = {
      userID: userID,
      role: []
    }
    return this.httpClient.post( `${this.REST_API_SERVER}/servers/${serverID}/users`, body, { headers: this.headers } )
  }

  addRoleToUser( userID: string, role: string){
    const body = {
      userID, role
    }
    return this.httpClient.post( `${this.REST_API_SERVER}/users/assign-role`, body, { headers: this.headers } )
  }
}
