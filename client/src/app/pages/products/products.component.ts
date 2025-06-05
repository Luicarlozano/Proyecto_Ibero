import { Component } from '@angular/core';
import { ListProductsComponent } from '../../components/list-products/list-products.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ModalCreateComponent } from '../../components/modal-create/modal-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ListProductsComponent, HeaderComponent,ModalCreateComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  modalIsOpenProduct = false;
  modalModeProduct: string = '';

  openModalProduct(){
    this.modalIsOpenProduct = true;
    this.modalModeProduct = 'product';
  }
  closeModalProduct(){
    this.modalIsOpenProduct = false;
  }
}
