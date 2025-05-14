import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ListUsersComponent } from "../../components/list-users/list-users.component";
import { ModalCreateComponent } from "../../components/modal-create/modal-create.component";
import { HeaderComponent } from '../../components/header/header.component';




@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListUsersComponent, ModalCreateComponent,HeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {
  modalIsOpenUser = false;
  modalModeUser: string = '';

  openModalUser(){
    this.modalIsOpenUser = true;
    this.modalModeUser = 'user';
  }
  closeModalUser(){
    this.modalIsOpenUser = false;
  }

}
