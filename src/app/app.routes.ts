import { Routes } from '@angular/router';
import { ReservationFormComponent } from './Components/reservation-form/reservation-form.component';
import { ReservationListComponent } from './Components/reservation-list/reservation-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ReservationFormComponent,
  },
  {
    path: 'all-bookings',
    component: ReservationListComponent,
  },
];
