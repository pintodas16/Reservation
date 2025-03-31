import { Component, HostListener, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  isScrolled: boolean = false;
  @Output() closeModal = new EventEmitter();
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = event.target.scrollTop;
    // const scrollPosition = window.innerHeight;
    // When scroll reaches 10vh or more, apply background to header
    console.log(scrollPosition);
    if (scrollPosition > 400) {
      console.log(scrollPosition);
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
