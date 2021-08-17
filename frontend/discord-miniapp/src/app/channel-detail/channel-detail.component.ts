import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.css']
})
export class ChannelDetailComponent implements OnInit {

  messages: any = [];
  channelInfo: any = {};

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.channelInfo = this.api.getSelectedChannel()
  }

}
