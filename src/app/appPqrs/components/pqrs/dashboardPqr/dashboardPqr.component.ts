import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { PqrPqrsEntity } from "src/app/appPqrs/entities/pqrPqrs.entity";
import { PqrPqrsService } from "src/app/appPqrs/services/pqrPqrs.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: 'app-pqrPqrsDashboard',
  templateUrl: './dashboardPqr.component.html',
  styleUrls: ['./dashboardPqr.component.css']
})
export class DashBoardPqrsComponent implements OnInit {
  initialDate: string;
  finalDate: string;
  loading: boolean;
  columns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<PqrPqrsEntity>();
  userId: number;
  dashboardPqr: PqrPqrsEntity;
  genPersonEntity: GenPersonEntity;
  constructor(private pqrsPqrService: PqrPqrsService, private alertS: AlertService, private dialog: MatDialog) {
    this.loading = false;
    this.initialDate = '';
    this.finalDate = '';
    this.userId = 0;
    this.columns = ['Numero', 'Ticket', 'Nombres y apellidos','Tipo Cliente','Proyecto', 'Usuario Pqrs', 'Usuario Creacion', 'Usuario Asignado', 'Pais', 'Departamento', 'Ciudad', 'Regional', 'Marca-Modelo', 'Metodo Contacto Inicial', 'Correo Contacto', 'Categoria', 'Area Responsable', 'Serial', 'Tipo', 'Resumen', 'Fecha Creacion', 'Numero Ingresos', 'Estado', 'Estado Final', 'Tecnico Responsable', 'Registro Fotografico', 'Diagnostico Tecnico-Reparacion', 'Fecha Escalacion Cliente', 'Fecha Respuesta Escalacion Cliente', 'Usuario Escalacion Interna', 'Fecha Escalacion Interna','Fecha Respuesta Escalacion Interna', 'Fecha Respuesta Pqrs Cliente', 'Estado Gestion', 'Metodo Contacto Final', 'Cantidad Equipos', 'Pqrs Atribuible', 'Observaciones Woden', 'Fecha Envio Unidades', 'Fecha Llegada Unidades', 'Nivel'];
    this.dataSource = new MatTableDataSource([]);

  }
  ngOnInit(): void {
    this.loading = true;
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.userId = 0;
    this.dashboardPqr = new PqrPqrsEntity();
    this.search();


  }

  search() {
    this.loading = true;
    this.initialDate = (document.getElementById('startDate') as HTMLInputElement).value != '' ? moment((document.getElementById('startDate') as HTMLInputElement).value).format('YYYY-DD-MM') : '0';
    this.finalDate = (document.getElementById('endDate') as HTMLInputElement).value != '' ? moment((document.getElementById('endDate') as HTMLInputElement).value).format('YYYY-DD-MM') : '0';
    this.pqrsPqrService.listReport(this.genPersonEntity.id, this.initialDate, this.finalDate).subscribe(res => {
      if (res.message === 'OK') {
        this.loading = false;
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  download(data: MatTableDataSource<any>) {
    let dataSource = data;
    let delimiter = "\\";
    let headers = '';
    let file = '';
    let columnsTable = ['number', 'ticket','nameLastname', 'customerType', 'proyect', 'userPqrs', 'creationPerson', 'assignedPerson', 'country', 'department', 'city', 'regional', 'tradeMark', 'contactMethod', 'contactEmail', 'category', 'responsibleArea', 'serial', 'type', 'summary', 'creationDate', 'entryNumber', 'status', 'finalStatus', 'technical', 'photographicRecord', 'diagnostic', 'customerEscalationDate', 'customerEscalationResponseDate', 'internalEscalationAgent','internalEscalationDate','internalEscalationResponseDate', 'responseDateCustomerPqrs', 'managementStatus', 'finalContactMethod', 'equipmentQuantity', 'attributablePqrs', 'observations', 'unitShipmentDate', 'unitArrivalDate', 'levelNumber'];
    let columns = ['Numero', 'Ticket', 'Nombres y apellidos', 'Tipo Cliente', 'Proyecto', 'Usuario Pqrs', 'Usuario Creacion', 'Usuario Asignado', 'Pais', 'Departamento', 'Ciudad', 'Regional', 'Marca-Modelo', 'Metodo Contacto Inicial', 'Correo Contacto', 'Categoria', 'Area Responsable', 'Serial', 'Tipo', 'Resumen', 'Fecha Creacion', 'Numero Ingresos', 'Estado', 'Estado Final', 'Tecnico Responsable', 'Registro Fotografico', 'Diagnostico Tecnico-Reparacion', 'Fecha Escalacion Cliente', 'Fecha Respuesta Escalacion Cliente', 'Usuario Escalacion Interna', 'Fecha Escalacion Interna','Fecha Respuesta Escalacion Interna', 'Fecha Respuesta Pqrs Cliente', 'Estado Gestion', 'Metodo Contacto Final', 'Cantidad Equipos', 'Pqrs Atribuible', 'Observaciones Woden', 'Fecha Envio Unidades', 'Fecha Llegada Unidades', 'Nivel'];

    for (let i = 0; i < columns.length; i++) {
      headers = headers + columns[i];
      if (i < columns.length - 1) {
        headers = headers + delimiter;
      }
    }
    file = headers;
    for (let i = 0; i < dataSource.data.length; i++) {
      file = file + "\n";
      for (let j = 0; j < columnsTable.length; j++) {
        file = file + dataSource.data[i][columnsTable[j]];
        file = file + delimiter;
      }
    }
    let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", 'Listado PQR' + ".csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}