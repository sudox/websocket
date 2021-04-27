import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromTodos from './todos.reducer'

export interface AppState {
  todos: fromTodos.TodoState
}
export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.reducer
}

const selectTodoBranch = (state: AppState) => state.todos;

const { selectAll: selectTodoListArray } = fromTodos.adapter.getSelectors(selectTodoBranch);
export const selectTodoList = createSelector(
  selectTodoListArray,
  todos => todos.map(todo => ({ ...todo, id: todo.id.toString() }))
)
