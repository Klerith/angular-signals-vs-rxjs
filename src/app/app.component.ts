import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, map, pipe, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.logSignals();
    this.logRxjs();
  }

  constructor() {

    effect( () => {
      console.log(`Count: ${ this.count() }, Count2: ${ this.count2() }`);
    });

    combineLatest([ this.count$, this.count2$ ])
      .subscribe( ([ count1, count2 ]) => {

        console.log(`Count1: ${ count1 }, Count2: ${ count2 }`)

      })

  }


  // Signals
  public count = signal(10);
  public doubleCount = computed( () => this.count() * 2 );

  public count2 = signal(5);
  public count1PlusCount2 = computed( () => this.count() + this.count2() );


  logSignals() {
    console.log('Signals');
    console.log(this.count(), this.count2(), this.count1PlusCount2());
  }


  // RXJS
  public count$ = new BehaviorSubject(10);
  public doubleCount$ = this.count$.pipe(
    map( value => value * 2 )
    );

  public count2$ = new BehaviorSubject(5);

  public count1PlusCount2$ = combineLatest([ this.count$, this.count2$ ])
    .pipe(
      tap( console.log ),
      map( ([ count1, count2 ]) => count1 + count2 )
    );

  logRxjs() {
    console.log('RXJS');
    console.log(
      this.count$.value,
      this.count2$.value,
    );

    this.count1PlusCount2$
      .pipe( take(1) )
      .subscribe( value => console.log(value));
  }

  // Helpers
  triggerChanges() {
    this.count.set(15);
    this.count$.next(15);
  }

}
