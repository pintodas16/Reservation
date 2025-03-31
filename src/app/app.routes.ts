import { Routes } from '@angular/router';
import { ReservationFormComponent } from './Components/reservation-form/reservation-form.component';
import { ReservationListComponent } from './Components/reservation-list/reservation-list.component';
import { CheckboxComponent } from './Components/checkbox/checkbox.component';

export const routes: Routes = [
  {
    path: '',
    component: ReservationFormComponent,
  },
  {
    path: 'all-bookings',
    component: ReservationListComponent,
  },
  {
    path: 'bookings/:id',
    component: ReservationFormComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxComponent,
  },
  {
    path: 'products/:name/:id',
    component: CheckboxComponent,
  },
];
