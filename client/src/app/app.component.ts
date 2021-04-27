import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTodos } from './actions/todos.actions';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(store: Store<AppState>) {
    store.dispatch(loadTodos());
  }
}
