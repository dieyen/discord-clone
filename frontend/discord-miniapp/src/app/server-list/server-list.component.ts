import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { DisplayChannelsService } from '../_services/display-channels.service';
import { Server, servers } from '../_types/server';
import { ApiService } from '../_services/api.service';
import { User } from '../_types/user';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  @Output() displayAddServerComponent = new EventEmitter<boolean>();
  @Output() serverEmitter = new EventEmitter<string>();

  toggleAddServer = false;
  
  serverList?: [];
  user?: User;

  constructor(
    private api: ApiService,
    private displayChannelsService: DisplayChannelsService
  ) { }

  ngOnInit(): void {
    this.api.getServers().subscribe(
      (data) => {
        var servers = data.data;
        this.serverList = servers;
        console.log( this.serverList );
      }
    )
    this.user = this.api.getUser();
  }

  selectServer(serverID: number){
    console.log( serverID );
    this.api.getChannels(serverID).subscribe(
      (data) => {
        var serverData = JSON.stringify( data.data );
        this.serverEmitter.emit(serverData);
      }
    );
  }

  addServer(){
    this.toggleAddServer = !this.toggleAddServer;
    this.displayAddServerComponent.emit(this.toggleAddServer);
  }

}
