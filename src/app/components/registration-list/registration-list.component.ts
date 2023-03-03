import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/User.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { columnDef } from 'src/app/models/column.interface';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit, OnDestroy {
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  columns: columnDef[];
  displayedColumns: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public subscription$!: Subscription[];

  constructor(
    private _as: ApiService,
    private _toastService: NgToastService,
    private confirm: NgConfirmService
  ) {
    this.columns = [
      {
        def: 'id',
        header: 'ID',
        cell: (element: User) => `${element.id}`,
      },
      {
        def: 'nombre',
        header: 'Nombre',
        cell: (element: User) => `${element.nombre}`,
      },
      {
        def: 'apellido',
        header: 'Apellido',
        cell: (element: User) => `${element.apellido}`,
      },
      {
        def: 'email',
        header: 'Correo',
        cell: (element: User) => `${element.email}`,
      },
      {
        def: 'mobile',
        header: 'Telefono',
        cell: (element: User) => `${element.mobile}`,
      },

      {
        def: 'weight',
        header: 'Peso',
        cell: (element: User) => `${element.weight}`,
      },
      {
        def: 'height',
        header: 'Altura',
        cell: (element: User) => `${element.height}`,
      },

      {
        def: 'bmi',
        header: 'B.M.I',
        cell: (element: User) => `${element.bmi}`,
      },
      {
        def: 'bmiResult',
        header: 'B.M.I Final',
        cell: (element: User) => `${element.bmiResult}`,
      },
      {
        def: 'trainer',
        header: 'Entrenador',
        cell: (element: User) => `${element.trainer}`,
      },
      {
        def: 'gender',
        header: 'Genero',
        cell: (element: User) => `${element.gender}`,
      },
      {
        def: 'tiempoPago',
        header: 'Tipo de Pago',
        cell: (element: User) => `${element.tiempoPago}`,
      },
      {
        def: 'objetivos',
        header: 'Objetivos',
        cell: (element: User) => `${element.objetivos}`,
      },
      {
        def: 'firstTimeGym',
        header: 'GYM',
        cell: (element: User) => `${element.firstTimeGym}`,
      },
      {
        def: 'fechaInicio',
        header: 'Fecha de Inicio',
        cell: (element: User) => `${element.fechaInicio}`,
      },
      {
        def: 'action',
        header: 'Action',
        cell: (element: User) => `${element.action}`,
      },
    ];

    this.displayedColumns = this.columns.map((c) => c.def);
  }
  ngOnDestroy(): void {
    this.subscription$.forEach((s) => s.unsubscribe());
  }
  ngOnInit(): void {
    this.getClientes();
  }
  getClientes() {
    this.subscription$ = [
      this._as.obtenerClientes().subscribe((res) => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
    ];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  borrarCliente(id: number) {
    this.confirm.showConfirm(
      'Se eliminara un registro, estas seguro?',
      () => {
        this._as.eliminarCliente(id).subscribe((res) => {
          this._toastService.warning({
            detail: 'Se borro el registro',
            summary: 'Registro Borrado',
            duration: 3000,
          });

          this.getClientes();
        });
      },
      () => {
        return;
      }
    );
  }
}
