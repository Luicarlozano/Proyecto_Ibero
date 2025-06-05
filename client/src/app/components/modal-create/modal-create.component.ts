import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../service/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { from } from 'rxjs';
import { EntryService } from '../../service/entry.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.css',
})
export class ModalCreateComponent {
  @Input() modalMode: string = '';

  @Output() close = new EventEmitter<void>();

  userService = inject(UsersService);
  productService = inject(ProductService);
  entryService = inject(EntryService);

  imagen: File | null = null;
  allProducts: Product[] = [];

  router = inject(Router);
  location = inject(Location);
  route = this.location.path();

  user: any = {
    firstName: '',
    lastName: '',
    idNumber: 0,
    email: '',
    role: '',
    password: '',
  };

  product: any = {
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

  entry: any = {
    codigoTRX: '',
    fecha: '',
    tipoMovimiento: '',
    productos: [
      {
        producto: '',
        cantidad: 0,
      },
    ],
    descripcion: '',
  };

  constructor() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      console.log(data);
      this.allProducts = data;
    });
  }

  userForm = new FormGroup({
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    idNumber: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required] }),
    role: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  productForm = new FormGroup({
    codigo: new FormControl('', { validators: [Validators.required] }),
    nombre: new FormControl('', { validators: [Validators.required] }),
    marca: new FormControl('', { validators: [Validators.required] }),
    estado: new FormControl('', { validators: [Validators.required] }),
    color: new FormControl('', { validators: [Validators.required] }),
    precio: new FormControl('', { validators: [Validators.required] }),
    stock: new FormControl('', { validators: [Validators.required] }),
    imagen: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
    categoria: new FormControl('', { validators: [Validators.required] }),
    descripcion: new FormControl('', { validators: [Validators.required] }),
  });

  entryForm = new FormGroup({
    codigoTRX: new FormControl('', { validators: [Validators.required] }),
    fecha: new FormControl('', { validators: [Validators.required] }),
    tipoMovimiento: new FormControl('', { validators: [Validators.required] }),
    producto: new FormControl('', { validators: [Validators.required] }),
    cantidad: new FormControl(0, { validators: [Validators.required] }),
    descripcion: new FormControl('', { validators: [Validators.required] }),
  });

  onfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key in formValue) {
      if (
        formValue.hasOwnProperty(key) &&
        formValue[key] !== null &&
        formValue[key] !== undefined
      ) {
        formData.append(key, formValue[key]);
      }
    }
    if (this.imagen) {
      formData.append('imagen', this.imagen, this.imagen.name);
    }
    console.log(formData.getAll('imagen'));
    return formData;
  }

  onSubmit() {
    if (this.modalMode == 'user') {
      if (this.userForm.valid) {
        console.log(this.userForm.value);
        this.user = this.userForm.value;
        console.log(this.user);
        this.userService.createUser(this.user).subscribe({
          next: (response: any) => {
            Swal.fire('Exitoso', response.message, 'success');
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([this.route]);
              });
          },
          error: (error) => {
            Swal.fire('Algo a fallado', error.error, 'error');
            console.log(error);
          },
        });
      }
    } else if (this.modalMode == 'product') {
      if (this.productForm.valid && this.imagen) {
        console.log(this.productForm.value);
        const formData = this.toFormData(this.productForm.value);
        console.log(formData);
        this.productService.createProduct(formData).subscribe({
          next: (response: any) => {
            Swal.fire('Exitoso', response.message, 'success');
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([this.route]);
              });
          },
          error: (error) => {
            Swal.fire('Algo a fallado', error.error, 'error');
            console.log(error);
          },
        });
      }
    } else if (this.modalMode == 'entry') {
      if (this.entryForm.valid) {
        console.log(this.entryForm.value);
        this.entry = this.entryForm.value;
        console.log(this.entry);
        this.entryService.createEntry(this.entry).subscribe({
          next: (response: any) => {
            Swal.fire('Exitoso', response.message, 'success');
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([this.route]);
              });
          },
          error: (error) => {
            Swal.fire('Algo a fallado', error.error, 'error');
            console.log(error);
          },
        });
      }
    }
    this.close.emit();
  }
}
