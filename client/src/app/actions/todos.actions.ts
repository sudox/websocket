import { createAction, props } from "@ngrx/store";
import { TodoEntity } from "../reducers/todos.reducer";

export const wsTodoAdded = createAction(
  '[todos] web socket todo added',
  props<{ payload: TodoEntity }>()
);

export const wsTodoIncomplete = createAction(
  '[todos] web socket todo incomplete',
  props<{ payload: TodoEntity }>()
);

export const wsTodoComplete = createAction(
  '[todos] web socket todo complete',
  props<{ payload: TodoEntity }>()
);

export const loadTodos = createAction(
  '[todos] loadTodos'
);

export const loadTodosSucceeded = createAction(
  '[todos] loadTodosSucceeded',
  props<{ payload: TodoEntity[] }>()
);

let id = 1;
export const todoAdded = createAction(
  '[todos] todo added',
  ({ description }: { description: string }) => ({
    payload: {
      id: 'TEMP' + id++,
      description,
      completed: false
    } as TodoEntity
  })
);

export const todoAddedSuccessfully = createAction(
  '[todos] todo added successfully',
  props<{ oldId: string, payload: TodoEntity }>()
);


export const todoCompleted = createAction(
  '[todos] todo completed',
  props<{ payload: TodoEntity }>()
);

export const todoIncomplete = createAction(
  '[todos] todo incomplete',
  props<{ payload: TodoEntity }>()
);

export const todoDescriptionChanged = createAction(
  '[todos] todo description changed',
  props<{ todo: TodoEntity, newDescription: string }>()
);
