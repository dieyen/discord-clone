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

  toggleAddServer = false;
  
  serverList?: [];
  user?: User;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getServers().subscribe(
      (data) => {
        console.log( data );
        var servers = data.data;
        this.serverList = servers;
      }
    )
    this.user = this.api.getUser();
  }

  selectServer(serverID: number){
    this.api.setSelectedServer( serverID );
    // console.log( "Server ID: ", this.api.getSelectedServerID() );

    this.api.getSelectedServer().subscribe(
      (data) => {
        var serverData = JSON.stringify( data.data );
        // console.log( serverData );
        this.serverEmitter.emit(serverData);
      }
    );
  }

  addServer(){
    this.toggleAddServer = !this.toggleAddServer;
    this.displayAddServerComponent.emit(this.toggleAddServer);
  }
}
