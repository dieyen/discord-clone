import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {

  @Input() isAddServer: boolean = false;

  serverForm = new FormGroup({
    name: new FormControl( '', [Validators.required] ),
    picture: new FormControl( '' ),
  })

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  get name(){
    return this.serverForm.value.name;
  }

  get picture(){
    return this.serverForm.value.picture;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    var reg = this.serverForm.value;
    this.api.addServer( reg.name, reg.picture).subscribe(
      (data) => {
        window.location.reload();
        console.log( data );
      }
    )
  }

}
