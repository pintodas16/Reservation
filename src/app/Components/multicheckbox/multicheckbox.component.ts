import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-multicheckbox',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './multicheckbox.component.html',
  styleUrl: './multicheckbox.component.scss',
})
export class MulticheckboxComponent {
  options = [
    { title: 'add extra cheese', cost: 30 },
    { title: 'add extra onion', cost: 30 },
    { title: 'add extra sauce', cost: 30 },
    { title: 'add extra tomato', cost: 30 },
  ];

  checkboxForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.checkboxForm = this.fb.group({
      checkboxes: this.fb.array([]),
    });

    this.addCheckboxes();
    this.checkboxForm.valueChanges.subscribe((value) => {
      this.getValues(value);
    });
  }

  get checkboxes() {
    return this.checkboxForm.get('checkboxes') as FormArray;
  }

  addCheckboxes() {
    this.options.forEach(() => {
      this.checkboxes.push(this.fb.control(false));
    });
  }

  getValues(value: any) {
    console.log(value);
    const selectedOptions = value.checkboxes
      .map((checked: boolean, i: number) => (checked ? this.options[i] : null))
      .filter((v: any) => v !== null);

    let totalCost = selectedOptions.reduce(
      (acc: number, cur: any) => acc + cur.cost,
      0
    );
    console.log(totalCost);
    console.log(selectedOptions);
  }
}
