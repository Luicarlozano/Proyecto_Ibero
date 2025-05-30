import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.css',
})
export class ModalUpdateComponent {
  @Input() modeUpdate: 'user' | 'product' = 'user';

   @Output() close = new EventEmitter<void>();
  
  @Input() user: User = {
    _id: '',
    firstName: '',
    lastName: '',
    idNumber: 0,
    email: '',
    role: '',
    password: '',
    state: '',
  };


  @Input() product: any = {
    _id: '',
    codigo: '',
    nombre: '',
    marca: '',
    estado: '',
    color: '',
    precio: 0,
    stock: 0,
    imagen: '',
    categoria: '',
    descripcion: '',
  };

private userService = inject(UsersService);
private productService = inject(ProductService);

router = inject(Router);
location = inject(Location);
route = this.location.path();

newUser:any = {
  firstName: '',
  lastName: '',
  idNumber: 0,
  email: '',
  role: '',
  password: '',
  state: '',
}

newProduct:any = {
  codigo: '',
  nombre: '',
  marca: '',
  estado: '',
  color: '',
  precio: 0,
  stock: 0,
  imagen: '',
  categoria: '',
  descripcion: '',
}

userForm = new FormGroup ({
  firstName: new FormControl('', { validators: [Validators.required] }),
  lastName: new FormControl('', { validators: [Validators.required] }),
  idNumber: new FormControl('', { validators: [Validators.required] }),
  email: new FormControl('', { validators: [Validators.required] }),
  role: new FormControl('', { validators: [Validators.required] }),
  password: new FormControl('', { validators: [Validators.required] }),
  state: new FormControl('', { validators: [Validators.required] }),
})

productForm = new FormGroup({
    codigo: new FormControl('', { validators: [Validators.required] }),
    nombre: new FormControl('', { validators: [Validators.required] }),
    marca: new FormControl('', { validators: [Validators.required] }),
    estado: new FormControl('', { validators: [Validators.required] }),
    color: new FormControl('', { validators: [Validators.required] }),
    precio: new FormControl('', { validators: [Validators.required] }),
    stock: new FormControl('', { validators: [Validators.required] }),
    categoria: new FormControl('', { validators: [Validators.required] }),
    descripcion: new FormControl('', { validators: [Validators.required] }),
  });

updateOne(){
  if(this.modeUpdate === 'user'){
    if(this.userForm.valid){
      this.newUser = this.userForm.value;
      this.userService.updateUser(this.newUser).subscribe({
        next: (response: any) => {
          console.log(response);
          Swal.fire('Usuario Actualizado', response.message, 'success');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.route]);
          });
        },
        error: (error) => {
          Swal.fire('Algo a fallado', error.error, 'error');
          console.log(error);
        },
      });
    }
  } else if(this.modeUpdate === 'product'){
    if(this.productForm.valid){
      this.newProduct = this.productForm.value;
      this.productService.updateProduct(this.newProduct.codigo,this.newProduct).subscribe({
        next: (response: any) => {
          console.log(response);
          Swal.fire('Producto Actualizado', response.message, 'success');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.route]);
          });
        },
        error: (error) => {
          Swal.fire('Algo a fallado', error.error, 'error');
          console.log(error);
        },
      });
    }
  };
  this.close.emit();
}





}



