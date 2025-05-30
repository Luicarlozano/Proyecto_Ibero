import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { ListEntrysComponent } from '../../components/list-entrys/list-entrys.component';

@Component({
  selector: 'app-entrys',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ModalCreateComponent,ListEntrysComponent
  ],
  templateUrl: './entrys.component.html',
  styleUrl: './entrys.component.css',
})
export class EntrysComponent {
  modalIsOpenEntry = false;
  modalModeEntry: string = '';

  openModalEntry() {
    this.modalIsOpenEntry = true;
    this.modalModeEntry = 'entry';
  }
  closeModalEntry() {
    this.modalIsOpenEntry = false;
  }
}
