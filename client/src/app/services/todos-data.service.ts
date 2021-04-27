import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { TodoEntity } from "../reducers/todos.reducer";
import { map } from 'rxjs/operators';
@Injectable()
export class TodosDataService {

  readonly url = environment.apiUrl + 'todos';

  getAll(): Observable<TodoEntity[]> {
    return this.client.get<{ data: TodoEntity[] }>(this.url)
      .pipe(
        map(r => r.data)
      )
  }

  markComplete(todo: TodoEntity) {
    return this.client.post(this.url + `/${todo.id}/completed`, todo);
  }

  markIncomplete(todo: TodoEntity) {
    return this.client.post(this.url + `/${todo.id}/incomplete`, todo);
  }
  addTodo(todo: TodoEntity): Observable<TodoEntity> {
    const todoToAdd = { description: todo.description, completed: todo.completed };
    return this.client.post<TodoEntity>(this.url, todoToAdd);
  }
  constructor(private client: HttpClient) { }
}
