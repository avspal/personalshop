import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navigateTo:string='recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBqbP-imsm7Rpj79uKe2jmGFSXnQN41zbk",
      authDomain: "ng-recipe-book-6e939.firebaseapp.com"
    });
  }

  onNavigate(event:string){
    this.navigateTo=event;
  }
}
