import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyAAdciK2UwMNcHzVNQN7iKi4_9L_7QmYcM",
      authDomain: "video-game-shelves.firebaseapp.com",
      databaseURL: "https://video-game-shelves.firebaseio.com",
      projectId: "video-game-shelves",
      storageBucket: "video-game-shelves.appspot.com",
      messagingSenderId: "491643954799"
  };
  firebase.initializeApp(config);
  }
}
