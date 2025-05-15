import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../service/users.service';
// import User from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent {
  userService = inject(UsersService);
  users: User[] = [];
 
  constructor() {
    this.userService.getUsers().subscribe((data: User[]) => {
      console.log("Value from service:")
      console.log(data);
      this.users = data;
    });
  }
}
