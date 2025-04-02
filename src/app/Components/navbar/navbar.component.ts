import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isScrolled: boolean = false;

  // @HostListener ('window:scroll',['$event']);
  // onWindowScroll(event:Event){}

  // @HostListener('window:scroll', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    if (window.scrollY >= 80) {
      this.isScrolled = true;
    } else this.isScrolled = false;
  }
}
