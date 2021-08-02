import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { User } from '../_types/user';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
  channels = [];
  
  @Output() displayAddChannelComponent = new EventEmitter<boolean>();
  @Output() channelEmitter = new EventEmitter<string>();

  toggleAddChannel = false;

  constructor(
    private api: ApiService
  ) { }
  
  viewChannels(){
    
  }

  ngOnInit(): void {
    this.api.getChannels( this.api.getSelectedServerID() ).subscribe(
      (data) => {
        var channels = data.data;
        this.channels = channels;
      }
    )
  }
  
  getChannels(): void {
    this.api.getChannels( this.api.getSelectedServerID() ).subscribe(
      (data) => {
        var channels = data.data;
        this.channels = channels;
        // console.log( this.channels );
      }
    )
  }

  addChannel(){
    this.toggleAddChannel = !this.toggleAddChannel;
    this.displayAddChannelComponent.emit( this.toggleAddChannel );
  }

}
