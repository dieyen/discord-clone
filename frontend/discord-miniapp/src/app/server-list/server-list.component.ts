import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
  @Output() displayChannelList = new EventEmitter<boolean>();

  toggleAddServer = false;
  toggleChannelList = false;
  
  serverList?: [];
  user?: User;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getServers().subscribe(
      (data) => {
        // console.log( data );
        var servers = data.data;
        this.serverList = servers;
      }
    )
    this.user = this.api.getUser();
  }

  selectServer(serverID: string){
    this.api.setSelectedServer( serverID );
    this.api.setUsers();
    // console.log( "Server ID: ", this.api.getSelectedServerID() );
    this.serverEmitter.emit(this.api.getSelectedServerID());
    this.toggleChannelList != this.toggleChannelList;
    this.displayChannelList.emit( this.toggleChannelList );
  }

  addServer(){
    this.toggleAddServer = true;
    this.displayAddServerComponent.emit(this.toggleAddServer);
  }
}
