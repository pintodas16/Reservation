import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../Services/reservation.service';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent implements OnInit {
  reservationId: string | null = '';
  reservationForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private reservation: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      roomNumber: ['', Validators.required],
    });

    this.reservationId = this.route.snapshot.paramMap.get('id');
    if (this.reservationId) {
      let reservation = this.reservation.getReservation(this.reservationId);
      console.log(reservation);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  handleSubmit(): void {
    if (this.reservationForm.valid) {
      let data = this.reservationForm.value;
      if (this.reservationId) {
        console.log(data);
        this.reservation.updateReservation(this.reservationId, data);
      } else {
        data = {
          id: Date.now().toString(),
          ...data,
        };
        this.reservation.addReservation(data);
      }

      this.reservationForm.reset();
      this.router.navigate(['/all-bookings']);
    } else {
      console.log('there is an error');
    }
  }
}
