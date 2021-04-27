import { Injectable } from "@angular/core";
import * as signalR from '@aspnet/signalr';
import { Store } from "@ngrx/store";
import { environment } from '../../environments/environment'
import { AppState } from "../reducers";
import * as actions from '../actions/todos.actions';

@Injectable()
export class SocketHubEffect {
  private hubConnection: signalR.HubConnection;

  constructor(private store: Store<AppState>) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.wsUrl)
      .build();

    this.hubConnection.onclose(err => {
      console.log("The hub connection was closed");
    })

    this.hubConnection.start()
      .then(() => console.log("The hub connection is started"))
      .catch(err => console.log("There was an error starting the connection"));

    this.hubConnection.on("todoAdded", (todo) => {
      this.store.dispatch(actions.wsTodoAdded({ payload: todo }));
    });

    this.hubConnection.on("todoCompleted", (todo) => {
      this.store.dispatch(actions.wsTodoComplete({ payload: todo }));
    })

    this.hubConnection.on("todoIncomplete", (todo) => {
      this.store.dispatch(actions.wsTodoIncomplete({ payload: todo }));
    })
  }


}
