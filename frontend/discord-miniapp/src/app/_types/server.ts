export interface Server {
    id: number;
    name: string;
    picture: string;
    // channels: string[];
  }
  
  export const servers = [
    {
        id: 1,
        name: 'Old World',
        picture: 'img/old-world.jpg',
        channels: [
            'High Clarence Hall',
            'Wormsway Prison',
            'Emporium Exotique',
            'Narwhal'
        ]
    },
    {
        id: 2,
        name: 'New World',
        picture: 'img/new-world.jpg',
        channels: [
            'El Puerto',
            'High Mountain',
        ]
    },
    {
        id: 3,
        name: 'Cape Trawleney',
        picture: 'img/cape-trawleney.jpg',
        channels: [
            'Crown Falls',
            'Old Nate Harbor'
        ]
    },
    {
        id: 4,
        name: 'The Passage',
        picture: 'img/the-passage.jpg',
        channels: [
            'King William Island',
            'Tunnganarniq',
            'Old Nate Airship'
        ]
    },
    {
        id: 5,
        name: 'Horn of Enbesa',
        picture: 'img/horn-of-enbesa.jpg',
        channels: [
            'Enbesa',
            'Waha Desher',
            'Kidusi',
            'Angereb'
        ]
    },

]
  
  
  /*
  Copyright Google LLC. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at https://angular.io/license
  */