import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { PriLabelService } from "src/app/appPrint/services/priLabel.service";
import { AdministrationPermissionModal } from "src/app/appPrint/modals/administrationPermission/administrationPermission.modal";

@Component({
  selector: 'app-priAdministrationPermission',
  templateUrl: './priAdministrationPermission.component.html',
  styleUrls: ['./priAdministrationPermission.component.css']
})
export class PriAdministrationPermissionComponent implements OnInit {
  title: string;
  loading: boolean;
  columns: string[];
  dataSource: MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  person: GenPersonEntity;

  constructor(private priLabelS: PriLabelService, private alertS: AlertService, private dialog: MatDialog) {
    this.title = '';
    this.loading = false;
    this.columns = ['userName', 'actions'];
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.loading = true;
    this.priLabelS.searchPermissionUserList().subscribe(res => {
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

  create(userId: number) {
    this.dialog.open(AdministrationPermissionModal, {
      data: { userId: userId },
      width: '100%'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.priLabelS.searchPermissionUserList().subscribe(res => {
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

  delete(userId: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar el permiso?' },
      width: '400px',
      height: '250px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.priLabelS.deletePermission(userId).subscribe(resD => {
          if (resD.message === 'OK') {
            if (resD.object != 0) {
              this.alertS.open('Permiso eliminado!', 'success');
              this.loading = true;
              this.priLabelS.searchPermissionUserList().subscribe(resL => {
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
              this.alertS.open('Error al eliminar el permiso!', 'error');
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