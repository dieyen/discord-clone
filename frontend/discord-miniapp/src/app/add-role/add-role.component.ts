import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  roleForm = new FormGroup({
    name: new FormControl( '', [Validators.required] ),
    isAdmin: new FormControl( true ),
  })

  constructor(
    private api: ApiService
  ) { }

  get name(){
    return this.roleForm.value.name;
  }

  get isAdmin(){
    return this.roleForm.value.isAdmin;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    var reg = this.roleForm.value;
    this.api.addRole( this.api.getSelectedServerID(), reg.name, reg.isAdmin ).subscribe(
      (data) => {
        window.location.reload();
        console.log( data );
      }
    )
  }

}
