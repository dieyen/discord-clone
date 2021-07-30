import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl( '', [Validators.required, Validators.email] ),
    displayName: new FormControl( '' ),
    picture: new FormControl( '' ),
    password: new FormControl( '', [Validators.required] )
  })
  
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  get email(){
    return this.userForm.value.email;
  }

  get displayName(){
    return this.userForm.value.displayName;
  }

  get picture(){
    return this.userForm.value.picture;
  }

  get password(){
    return this.userForm.value.password;
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    var reg = this.userForm.value;
    this.api.registerUser( reg.email, reg.displayName, reg.picture, reg.password ).subscribe(
      (data) => {
        this.router.navigate( ['/login'] );
        console.log( data );
      }
    )
  }

}
