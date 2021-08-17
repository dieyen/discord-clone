import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../_services/api.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users?: any = [];

  userForm = new FormGroup({
    email: new FormControl( '' )
  })

  constructor(
    private api: ApiService
  ) { }

  get email(){
    return this.userForm.value.user;
  }

  setUsers(){
    this.users = this.api.getUsersList();
  }

  ngOnInit(): void {
    this.users = this.api.getUsersList();
  }

  onSubmit(){
    var reg = this.userForm.value;
    this.api.addUserToServer( this.api.getSelectedServerID(), reg.email, '[]' ).subscribe(
      (data) => {
        window.location.reload();
      }
    )
  }

}
