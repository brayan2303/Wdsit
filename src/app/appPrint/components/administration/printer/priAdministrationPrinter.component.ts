import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { PriPrinterService } from "src/app/appPrint/services/priPrinter.service";
import { PriPrinterEntity } from "src/app/appPrint/entities/priPrinter.entity";
import { AdministrationPrinterModal } from "src/app/appPrint/modals/administrationPrinter/administrationPrinter.modal";

@Component({
  selector: 'app-priAdministrationPrinter',
  templateUrl: './priAdministrationPrinter.component.html',
  styleUrls: ['./priAdministrationPrinter.component.css']
})
export class PriAdministrationPrinterComponent implements OnInit {
  printerId: number;
  title: string;
  loading: boolean;
  columns: string[];
  dataSource: MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  person: GenPersonEntity;

  constructor(private priPrinterS: PriPrinterService, private alertS: AlertService, private dialog: MatDialog) {
    this.printerId = 0;
    this.title = '';
    this.loading = false;
    this.columns = ['name', 'ip', 'location', 'customer', 'active', 'actions'];
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.loading = true;
    this.priPrinterS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.dataSource = new MatTableDataSource(res.object);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  create(printer: PriPrinterEntity) {
    this.dialog.open(AdministrationPrinterModal, {
      data: { printerEntity: printer },
      width: '100%'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.priPrinterS.list().subscribe(res => {
          if (res.message === 'OK') {
            this.dataSource = new MatTableDataSource(res.object);
            this.dataSource.paginator = this.paginator;
            this.loading = false;
          } else {
            this.alertS.open(res.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }
    });
  }
  delete(id: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar la impresora?' },
      width: '400px',
      height: '250px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.priPrinterS.delete(id).subscribe(resD => {
          if (resD.message === 'OK') {
            if (resD.object != 0) {
              this.alertS.open('Impresora eliminada!', 'success');
              this.loading = true;
              this.priPrinterS.list().subscribe(resL => {
                if (resL.message === 'OK') {
                  this.dataSource = new MatTableDataSource(resL.object);
                  this.dataSource.paginator = this.paginator;
                  this.loading = false;
                } else {
                  this.alertS.open(resL.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('Error al eliminar la impresora!', 'error');
            }
          } else {
            this.alertS.open(resD.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }
    });
  }
}