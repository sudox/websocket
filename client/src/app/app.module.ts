import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { TodosDataService } from './services/todos-data.service';
import { TodoEffects } from './effects/todos.effects';
import { SocketHubEffect } from './effects/socket.effect';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects, SocketHubEffect]),
    StoreDevtoolsModule.instrument(),
    ReactiveFormsModule
  ],
  providers: [TodosDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
