import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosDataService } from "../services/todos-data.service";
import * as actions from '../actions/todos.actions';
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class TodoEffects {


  markComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoCompleted),
      switchMap(todo => this.service.markComplete(todo.payload))
    )
    , { dispatch: false });


  markIncomplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoIncomplete),
      switchMap(todo => this.service.markIncomplete(todo.payload))
    )
    , { dispatch: false });


  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoAdded),
      switchMap(todo => this.service.addTodo(todo.payload)
        .pipe(
          map(payload => actions.todoAddedSuccessfully({ oldId: todo.payload.id, payload }))
        )
      )
    )

  )

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadTodos),
      switchMap(() => this.service.getAll()
        .pipe(
          map(payload => actions.loadTodosSucceeded({ payload }))
        )
      )
    )
    , { dispatch: true }
  )

  constructor(
    private service: TodosDataService,
    private actions$: Actions
  ) { }
}
