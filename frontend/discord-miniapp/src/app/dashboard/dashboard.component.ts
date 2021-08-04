import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChannelListComponent } from '../channel-list/channel-list.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAddServer: boolean = false; 
  isAddChannel: boolean = false;
  isChannelSelected: boolean = false;

  channels = [];
  roles = [];
  users = [];

  @ViewChild(ChannelListComponent) channelList!: ChannelListComponent;

  @ViewChild(UserListComponent) userList!: UserListComponent;

  constructor(
    private api: ApiService
  ) { 

  }

  toggleAddServer( state: boolean ){
    this.isAddServer = state;
  }

  setServer( payload: number ){
    this.channelList.retrieveChannels();
    this.userList.retrieveUsers();
  }

  ngOnInit(): void {
  }

  toggleAddChannel( state: boolean ){
    this.isAddChannel = state;
  }

  toggleSetChannel( state: boolean ){
    this.isChannelSelected = state;
  }

}
