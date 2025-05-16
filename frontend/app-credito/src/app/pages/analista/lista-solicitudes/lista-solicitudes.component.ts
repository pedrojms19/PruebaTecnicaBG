import { Component, ViewChild } from '@angular/core';
import { SolicitudService } from '../../../shared/solicitud.service';
import { Solicitud } from '../../../shared/models/solicitud.model';
import { DecimalPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-solicitudes',
  imports: [
    DecimalPipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatLabel, MatSelectModule
  ],
  templateUrl: './lista-solicitudes.component.html',
  styleUrl: './lista-solicitudes.component.css',
})
export class ListaSolicitudesComponent {
  columnas: string[] = [
    'Usuario',
    'montoSolicitado',
    'plazoEnMeses',
    'ingresoMensual',
    'antiguedadLaboral',
    'estado',
    'acciones',
  ];
  error: string | null = null;
  estadoSeleccionado: string = '';
  dataSource = new MatTableDataSource<Solicitud>();
  isFetched = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private solicitudService: SolicitudService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
        this.isFetched = true;

        this.cdr.detectChanges();

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) =>
        (this.error = err.error?.message || 'Error al cargar solicitudes'),
    });
  }

  cambiarEstado(id: string, nuevoEstado: string): void {
    this.solicitudService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        const solicitud = this.dataSource.data.find(s => s.id === id);
        if (solicitud) solicitud.estado = nuevoEstado;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al actualizar el estado.';
      }
    });
  }

  aplicarFiltroEstado(): void {
    this.dataSource.filterPredicate = (data: Solicitud, filter: string) =>
      filter === '' || data.estado.toLowerCase() === filter;

    this.dataSource.filter = this.estadoSeleccionado.toLowerCase();
  }

}
