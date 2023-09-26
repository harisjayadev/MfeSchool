import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddCommunication } from '../../actions/comm.action';
import { ICommunication } from '../../models/communication';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  angForm: FormGroup;

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private store: Store) {
    this.angForm = this.createForm();
  }

  /**
   * Initialize the form
   */
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  /**
   * Handle the add user when the 'Create User' button is clicked
   * @param name: user's name
   * @param email: user's email
   */
  addCommunication(name: string, notes: string): void {
    this.store.dispatch(new AddCommunication({ name,notes } as ICommunication));
  }

  /**
   * Get the users for unit testing purposes
   */
  getCommunication(): ICommunication[] {
    var x = this.store.selectSnapshot<ICommunication[]>(state => state.communications);
    return x;
  }
}
