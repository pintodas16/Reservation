import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { CheckboxComponent } from './Components/checkbox/checkbox.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'reservation';
}
