import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { User } from '../_types/user';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users?: any = [];

  userForm = new FormGroup({
    userID: new FormControl( '' )
  })

  constructor(
    private api: ApiService
  ) { }

  get user(){
    return this.userForm.value.user;
  }

  setUsers(){
    this.users = this.api.getUsersList();
    // this.api.getUsers().subscribe(
    //   (val) => {
    //     console.log( val );
    //     this.users = val;
    //   }
    // );
    console.log( "Setting users:", this.users );
  }

  ngOnInit(): void {
    this.users = this.api.getUsersList();
    console.log( "Setting users:", this.users );
  }

  onSubmit(){
    var reg = this.userForm.value;
    // console.log( reg );
    this.api.addUserToServer( this.api.getSelectedServerID(), reg.userID, '[]' ).subscribe(
      (data) => {
        window.location.reload();
        console.log( data );
      }
    )
  }

}
