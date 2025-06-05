import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EntrysComponent } from '../../pages/entrys/entrys.component';
import { EntryService } from '../../service/entry.service';
import { Entry } from '../../models/entry.model';
import { Router } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-entrys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-entrys.component.html',
  styleUrl: './list-entrys.component.css',
})
export class ListEntrysComponent {
  entryService = inject(EntryService);
  entrys: any[] = [];

  entryInfo: any = {
    _id: '',
    codigoTRX: '',
    fecha: '',
    tipoMovimiento: '',
    producto: {},
    codigo: '',
    cantidad: 0,
    descripcion: '',
    usuario: {},
  };

  constructor() {
    this.entryService.getEntrys().subscribe((data: any[]) => {
      this.entrys = data;
    });
  }
}
