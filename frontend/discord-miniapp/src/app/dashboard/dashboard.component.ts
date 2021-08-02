import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChannelListComponent } from '../channel-list/channel-list.component';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAddServer: boolean = false; 
  isAddChannel: boolean = false;

  channels = [];
  roles = [];
  users = [];

  @ViewChild(ChannelListComponent)
  channelList!: ChannelListComponent;

  constructor(
    private api: ApiService
  ) { 

  }

  toggleAddServer( state: boolean ){
    this.isAddServer = state;
  }

  setServer( payload: string ){
    var serverData = JSON.parse( payload );
    // console.log( "Current payload:", serverData );
    this.channels = serverData.channels;
    this.users = serverData.users;

    if ( this.channelList ){
      this.channelList.getChannels();
    }
  }

  ngOnInit(): void {
  }

  toggleAddChannel( state: boolean ){
    this.isAddChannel = state;
  }

}
