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
    this.reservations = this.reservationService.getReservations();
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
  }
}
