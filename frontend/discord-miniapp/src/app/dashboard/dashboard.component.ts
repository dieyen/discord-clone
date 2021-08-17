import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
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
  isAddRole: boolean = false;
  isAddUser: boolean = false;
  isChannelSelected: boolean = false;
  isServerSelected: boolean = false;

  channels = [];
  roles = [];
  users = [];

  @ViewChild(ChannelListComponent) channelList!: ChannelListComponent;
  @ViewChild(UserListComponent) userList!: UserListComponent;
  @ViewChild(AddUserComponent) addUser!: AddUserComponent;

  constructor(
    private api: ApiService
  ) { 

  }


  setServer(){
    this.isServerSelected = true;
    this.channelList.isServerSelected( true );
    this.channelList.retrieveChannels();
    this.userList.isServerSelected( true );
    this.userList.retrieveUsers();
  }

  ngOnInit(): void {
  }

  toggleAddServer( state: boolean ){
    this.isAddChannel = false;
    this.isChannelSelected = false;
    this.isAddRole = false;
    this.isAddUser = false;

    if ( !this.isAddServer ){
      this.isAddServer = state;
    }
    else{
      this.isAddServer = !state;
    }
  }

  toggleAddChannel( state: boolean ){
    this.isAddServer = false;
    this.isChannelSelected = false;
    this.isAddRole = false;
    this.isAddUser = false;

    if ( !this.isAddChannel ){
      this.isAddChannel = state;
    }
    else{
      this.isAddChannel = !state;
    }
  }

  toggleSetChannel( state: boolean ){
    this.isAddServer = false;
    this.isAddChannel = false;
    this.isAddRole = false;
    this.isAddUser = false;

    if ( !this.isChannelSelected ){
      this.isChannelSelected = state;
    }
    else{
      this.isChannelSelected = !state;
    }
  }

  toggleAddRole( state: boolean ){
    this.isAddServer = false;
    this.isAddChannel = false;
    this.isChannelSelected = false;
    this.isAddUser = false;

    if ( !this.isAddRole ){
      this.isAddRole = state;
    }
    else{
      this.isAddRole = !state;
    }
  }

  toggleAddUser( state: boolean ){
    this.isAddServer = false;
    this.isAddChannel = false;
    this.isChannelSelected = false;
    this.isAddRole = false;
    if ( this.addUser ){
      this.addUser.setUsers();
    }

    if ( !this.isAddUser ){
      this.isAddUser = state;
    }
    else{
      this.isAddUser = !state;
    }
  }

  setChannel(channel: any){
    this.api.setSelectedChannel( channel );
    this.isAddServer = false;
    this.isAddChannel = false;
    this.isAddRole = false;
    this.isAddUser = false;

    if ( !this.isChannelSelected ){
      this.isChannelSelected = true;
    }
    else{
      this.isChannelSelected = false;
    }
  }

}
