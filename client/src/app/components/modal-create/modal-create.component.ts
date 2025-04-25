import { Component, Input, Output, EventEmitter,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.css'
})
export class ModalCreateComponent {
  @Input() modalMode: string = '';

  @Output() close = new EventEmitter<void>();

  userService = inject(UsersService);
  router = inject(Router);
  location = inject(Location);
  route = this.location.path();

  user: any = {
    firstName:'',
    lastName:'',
    idNumber:0,
    email:'',
    role:'',
    password:'',
  }

  userForm = new FormGroup({
    firstName: new FormControl('',{validators: [Validators.required] }),
    lastName: new FormControl('',{validators:[Validators.required],}),
    idNumber: new FormControl('',{validators:[Validators.required]}),
    email: new FormControl('',{validators:[Validators.required]}),
    role: new FormControl('',{validators:[Validators.required]}),
    password: new FormControl('',{validators:[Validators.required]}),
  });

onSubmit() {
  console.log(this.userForm.value);
  if(this.modalMode == 'user'){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.user = this.userForm.value;
      console.log(this.user);
      this.userService.createUser(this.user).subscribe({
        next: (response:any)=>{
          Swal.fire('Exitoso',response.message,'success');
          this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>{this.router.navigate([this.route])})
        },
        error:(error)=>{
          Swal.fire('Algo a fallado',error.message,'error');
          console.log(error);
        }
      })
    }
  } else if(this.modalMode == 'product'){}else if(this.modalMode == 'entry'){};
  this.close.emit();
}

}


