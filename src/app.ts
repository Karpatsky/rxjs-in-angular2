import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import {Subject} from "rxjs/Subject";
import {Store} from '@ngrx/store';
import {SECOND, HOUR} from './reducers';

@Component({
    selector: 'app',
    template: `
        <input #inputNum type="number" value="0">
        <button (click)="click$.next(inputNum.value)">Update</button>
        <h1>{{clock | async | date:'yMMMMEEEEdjms'}}</h1>
        `
})
export class App {
    click$ = new Subject()
        .map((value)=> ({type:HOUR, payload:parseInt(value)}));

    seconds$ = Observable
        .interval(1000)
        .mapTo({type: SECOND, payload:3});

    clock;

    constructor(store:Store) {
        this.clock = store.select('clock');

        Observable.merge(
            this.click$,
            this.seconds$
        )
            .subscribe(store.dispatch.bind(store))
    }
}