import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-header',
  imports: [RouterLink, NzModalModule, ModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isVisible: boolean = false;

  handleCancel() {
    this.isVisible = false;
    document.body.classList.remove('no--scrollbar');
  }
  handleOpen() {
    this.isVisible = true;
    document.body.classList.add('no--scrollbar');
  }
}
