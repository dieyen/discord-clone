import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() isAddRole: boolean = false;
  @Output() displayAddRoleComponent = new EventEmitter<boolean>();
  @Input() isAddUser: boolean = false;
  @Output() displayAddUserComponent = new EventEmitter<boolean>();

  toggleSelectedServer = false;

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
        // console.log( users );
        this.userList = users;
      }
    )
  }

  isServerSelected(state: boolean){
    this.toggleSelectedServer = state;
  }
  
  selectUser(userID: string){

  }

  addUser(){
    this.isAddUser = true;
    this.displayAddUserComponent.emit( this.isAddUser );
  }

  addRole(){
    console.log( "You want to add a role!" );
    this.isAddRole = true;
    this.displayAddRoleComponent.emit( this.isAddRole );
  }

}
