import { Injectable } from '@angular/core';

import { Server } from '../_types/server';

@Injectable({
  providedIn: 'root'
})
export class DisplayChannelsService {
  channels: String[] = [];

  constructor() { }

  getChannels(){
    return this.channels;
  }

  setChannels( server: Server ){
    // this.channels = server.channels;
  }

  resetChannels(){
    this.channels = [];
    return this.channels;
  }
}
