import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAddServer: boolean = false; 

  channels = [];
  roles = [];
  users = [];

  constructor(
  ) { 

  }

  toggleAddServer( state: boolean ){
    this.isAddServer = state;
  }

  setServer( payload: string ){
    var serverData = JSON.parse( payload );

    this.channels = serverData.channels;

    console.log( this.channels );
  }

  ngOnInit(): void {
  }

}
