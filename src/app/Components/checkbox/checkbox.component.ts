import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { MulticheckboxComponent } from '../multicheckbox/multicheckbox.component';
import { OurStoryComponent } from '../our-story/our-story.component';
@Component({
  selector: 'app-checkbox',

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MulticheckboxComponent,
    OurStoryComponent,
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  // options = [
  //   { title: 'add cheese', cost: 20 },
  //   { title: 'add onion extra', cost: 10 },
  //   { title: 'add extra sauce', cost: 30 },
  // ];
  // // checkboxOne: FormGroup;
  // checkboxGroup: FormGroup;
  // // checkboxForm: FormGroup;
  // constructor(private formBuilder: FormBuilder) {
  //   // this.checkboxOne = this.formBuilder.group({
  //   //   checkOne: [false],
  //   // });
  //   this.checkboxGroup = this.formBuilder.group({
  //     checkboxes: this.formBuilder.array([]),
  //   });
  //   this.addCheckboxes();
  //   // this.checkboxForm = this.formBuilder.group({
  //   //   agreeTerms: [false, Validators.requiredTrue], // Checkbox must be checked
  //   // });
  //   // this.checkboxOne.get('checkOne')?.valueChanges?.subscribe((value) => {
  //   //   console.log(value);
  //   // });
  // }
  // get checkboxes() {
  //   return this.checkboxGroup.get('cehckboxes') as FormArray;
  // }
  // addCheckboxes() {
  //   // this?.options?.forEach(() => {
  //   //   this.checkboxes.push(this.formBuilder.control(false));
  //   // });
  //   if (this.checkboxes) {
  //     this.options.forEach(() => {
  //       // Each checkbox starts with a value of 'false' (unchecked)
  //       this.checkboxes.push(this.formBuilder.control(false)); // Add a new checkbox to the FormArray
  //     });
  //   } else {
  //     console.error('FormArray is not properly initialized!');
  //   }
  // }
  // getSelectedValues() {
  //   const selectedOptions = this.checkboxGroup.value.checkboxes;
  //   console.log(selectedOptions);
  // }
  // // get agree() {
  // //   console.log(this.checkboxForm.get('agreeTerms')?.touched);
  // //   return this.checkboxForm.get('agreeTerms');
  // // }
  // // // ussing change method
  // // onChange(e: any) {
  // //   console.log(e?.target?.value, e?.target?.checked);
  // // }
  // // using reactive forms subscribe
  // hello() {}
}
