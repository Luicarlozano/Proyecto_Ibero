import { Component, inject } from '@angular/core';
import { ModalUpdateComponent } from '../modal-update/modal-update.component';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [ModalUpdateComponent, CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent {
  productService = inject(ProductService);
  products: Product[] = [];
  location = inject(Location);
  router = inject(Router);
  route = this.location.path();

  modalUpdateMode: 'product' = 'product';
  modalUpdateIsOpen = false;

  productInfo: any = {
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

  constructor() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  openModalUpdate(modeUpdate: 'product', product: Product) {
    this.modalUpdateIsOpen = true;
    this.modalUpdateMode = modeUpdate;
    this.productInfo = product;
  }

  closeUpdateModal() {
    this.modalUpdateIsOpen = false;
  }

  deleteOneProduct(codigo: string) {
    this.productService.deleteProduct(codigo).subscribe({
      next: (response: any) => {
        console.log(response);
        Swal.fire('Product Eliminado', response.message, 'success');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
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
