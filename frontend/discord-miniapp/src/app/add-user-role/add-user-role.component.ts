import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {

  selectedUser?: any = '';
  roles?: any = [];

  userForm = new FormGroup({
    userID: new FormControl( '' ),
    roleID: new FormControl( '' ),
  })

  constructor(
    private api: ApiService
  ) { }

  get userID(){
    return this.userForm.value.userID;
  }

  get roleID(){
    return this.userForm.value.roleID;
  }

  setRoles(){
    this.roles = this.api.getRolesInServer();
    // this.api.getUsers().subscribe(
    //   (val) => {
    //     console.log( val );
    //     this.users = val;
    //   }
    // );
    console.log( "Setting roles:", this.roles );
  }

  ngOnInit(): void {
    this.roles = this.api.getRolesInServer();
    // console.log( "Setting users:", this.users );
  }

  onSubmit(){
    var reg = this.userForm.value;
    // console.log( reg );
    this.api.addRoleToUser( reg.userID, JSON.stringify( reg.role ) ).subscribe(
      (data) => {
        window.location.reload();
        console.log( data );
      }
    )
  }

}
