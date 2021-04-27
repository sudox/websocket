import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { todoCompleted, todoDescriptionChanged, todoIncomplete } from 'src/app/actions/todos.actions';
import { AppState, selectTodoList } from 'src/app/reducers';
import { TodoEntity } from 'src/app/reducers/todos.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items$: Observable<TodoEntity[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.items$ = this.store.select(selectTodoList);
  }

  todoCompleted(todo: TodoEntity) {
    this.store.dispatch(todoCompleted({ payload: todo }))
  }

  todoIncomplete(todo: TodoEntity) {
    this.store.dispatch(todoIncomplete({ payload: todo }));
  }

  changeDescription(todo: TodoEntity, description: string) {
    this.store.dispatch(todoDescriptionChanged({ todo, newDescription: description }));
  }

}
