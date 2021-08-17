import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {

  @Input() isAddChannel: boolean = false;

  channelForm = new FormGroup({
    name: new FormControl( '', [Validators.required] ),
    description: new FormControl( '' ),
  })

  constructor(
    private api: ApiService
  ) { }

  get name(){
    return this.channelForm.value.name;
  }

  get description(){
    return this.channelForm.value.description;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    var reg = this.channelForm.value;
    this.api.addChannel( this.api.getSelectedServerID(), reg.name, reg.description ).subscribe(
      (data) => {
        window.location.reload();
      }
    )
  }

}
