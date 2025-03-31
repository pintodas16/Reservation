import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../Services/reservation.service';
import { Reservation } from '../../../../../hotel-app/src/app/models/reservation';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent implements OnInit {
  reservationId: string = '';
  reservations: Reservation[] = [];
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations: Reservation[]) => {
        this.reservations = reservations;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      },
      complete: () => {
        console.log('Reservations fetch complete');
      },
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
  }
}
