import { Injectable, Inject } from '@angular/core';
import { Reservation } from './../../../../hotel-app/src/app/models/reservation';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[] = [];
  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {
    this.loadReservation();
  }

  // private showToast(type: string, message: string): void {
  //   this.message.create(type, {
  //     nzContent: message,
  //   });
  // }

  private loadReservation() {
    try {
      const savedReservation = localStorage.getItem('reservations');
      if (savedReservation) {
        this.reservations = JSON.parse(savedReservation);
      } else {
        this.reservations = [];
      }
    } catch (error) {
      console.log('there is an error', error);
      this.reservations = [];
    }
  }

  private savedReservation() {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  addReservation(reservation: Reservation) {
    this.reservations = [...this.reservations, reservation];
    this.savedReservation();
    this.notification.create('success', 'Reservation addedSuccessfully', '');
  }

  deleteReservation(id: string) {
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations.splice(index, 1);
    // this.reservations = [...this.reservations].filter((res) => res.id !== id);

    this.savedReservation();
    this.notification.create(
      'warning',
      'Reservation Deleted Successfully',
      '',
      { nzDuration: 1000 }
    );
  }

  updateReservation(id: string, reservation: Reservation) {
    // let index = this.reservations.find(res=> res.id ===reservation.id)
    console.log(reservation);
    this.reservations = this.reservations.map((res) => {
      if (res.id === id) {
        return { ...reservation, id };
      }
      return res;
    });

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    this.notification.create('success', 'Reservation Updated Successfully', '');
  }
}
