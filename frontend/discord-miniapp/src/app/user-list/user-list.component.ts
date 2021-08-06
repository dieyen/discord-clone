import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList = [];
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  
  retrieveUsers(){
    this.api.getUsersInServer().subscribe(
      (data) => {
        var users = data.data;
        console.log( users );
        this.userList = users;
      }
    )
  }

  addUser(){

  }

}
