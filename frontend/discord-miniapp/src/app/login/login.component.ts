import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl( '', [Validators.required, Validators.email] ),
    password: new FormControl( '', [Validators.required] )
  })
  
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  get email(){
    return this.userForm.value.email;
  }

  get password(){
    return this.userForm.value.password;
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    var reg = this.userForm.value;
    this.api.loginUser( reg.email, reg.password );
  }

}
