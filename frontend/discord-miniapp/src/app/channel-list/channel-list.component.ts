import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Server, servers } from '../_types/server';
import { DisplayChannelsService } from '../_services/display-channels.service';
@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
  @Input() channels = [];

  constructor(
    private route: ActivatedRoute,
    private displayChannelsService: DisplayChannelsService
  ) { }
  
  viewChannels(){
    
  }

  ngOnInit(): void {
  }
}
