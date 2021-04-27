import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { HalLink } from 'src/app/types/types-hal';
import { HypermediaEntity } from 'src/app/types/types-store';
import * as actions from '../actions/todos.actions';
export interface TodoEntity extends HypermediaEntity {
  id: string;
  description: string;
  completed: boolean;
}

export interface TodoState extends EntityState<TodoEntity> {
  links: HalLink[]
}

export const adapter = createEntityAdapter<TodoEntity>();

const initialState = adapter.getInitialState({
  links: []
});


const reducerFunction = createReducer(
  initialState,
  on(actions.todoAdded, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.loadTodosSucceeded, (s, a) => adapter.setAll(a.payload, s)),
  on(actions.todoAddedSuccessfully, (s, a) => adapter.updateOne({ id: a.oldId, changes: { id: a.payload.id } }, s)),
  on(actions.todoCompleted, actions.todoIncomplete, (s, a) => adapter.updateOne({ id: a.payload.id, changes: { completed: !a.payload.completed } }, s))
);

export function reducer(state: TodoState = initialState, action: Action): TodoState {
  return reducerFunction(state, action);
}



