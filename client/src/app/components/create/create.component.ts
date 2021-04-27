import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { todoAdded } from 'src/app/actions/todos.actions';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
  }

  get description() { return this.form.get('description'); }
  submit(): void {
    const description = this.description.value;
    this.store.dispatch(todoAdded({ description }))
  }
}
