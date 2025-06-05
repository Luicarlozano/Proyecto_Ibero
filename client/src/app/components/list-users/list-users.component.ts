import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../service/users.service';
// import User from '../../models/user.model';
import { CommonModule, Location } from '@angular/common';
import { User } from '../../models/user.model';
import { ModalUpdateComponent } from "../modal-update/modal-update.component";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, ModalUpdateComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent {
  userService = inject(UsersService);
  users: User[] = [];
  location = inject(Location);
  router = inject(Router);
  route = this.location.path();

  modalUpdateMode: 'user' | 'product' = 'user';
  modalUpdateIsOpen = false;

userInfo: any = {
    firstName:'',
    lastName:'',
    idNumber:0,
    email:'',
    role:'',
    password:'',
    state:''
  }
 
  constructor() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  openModalUpdate(modeUpdate:'user' | 'product', user: User) {
    this.modalUpdateIsOpen = true;
    this.modalUpdateMode = modeUpdate;
    this.userInfo = user;
  }

  closeUpdateModal(){
    this.modalUpdateIsOpen = false;
  }

  deleteOneUser(email: string) {
    this.userService.deleteUser(email).subscribe({
      next: (response: any) => {
        console.log(response);
        Swal.fire('Usuario Eliminado', response.message, 'success');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.route]);
        });
      },
      error: (error) => {
        Swal.fire('Algo a fallado', error.error, 'error');
        console.error(error);
      },
    });
  }
}
