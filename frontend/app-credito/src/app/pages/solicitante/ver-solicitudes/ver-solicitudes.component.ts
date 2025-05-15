import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { Solicitud } from '../../../shared/models/solicitud.model';
import { DecimalPipe } from '@angular/common';
import { SolicitudService } from '../../../shared/solicitud.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-versolicitudes',
  imports: [
    DecimalPipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './ver-solicitudes.component.html',
  styleUrl: './ver-solicitudes.component.css',
})
export class VersolicitudesComponent {
  error: string | null = null;
  isFetched = false;
  dataSource = new MatTableDataSource<Solicitud>();
  columnas: string[] = [
    'montoSolicitado',
    'plazoEnMeses',
    'ingresoMensual',
    'antiguedadLaboral',
    'estado',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private solicitudService: SolicitudService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  cargarSolicitudes(): void {
    this.solicitudService.getSolicitudPorUserId().subscribe({
      next: (data) => {
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
}
