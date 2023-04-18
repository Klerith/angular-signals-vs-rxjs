import { Component, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Signals
  public count = signal(10);




  // RXJS
  public count$ = new BehaviorSubject(10);





}
