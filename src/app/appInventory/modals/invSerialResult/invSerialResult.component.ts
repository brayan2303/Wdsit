import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvGeneraSerialService } from "../../services/invGeneraSerial.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { InvGeneralInitService } from "../../services/invGeneralInit.service";

@Component({
  selector: 'modal-invSerialResult',
  templateUrl: './invSerialResult.component.html',
  styleUrls: ['./invSerialResult.component.css']
})

export class invSerialResultComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  @ViewChild('serials') searchElement: ElementRef;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;
  genPersonEntity: GenPersonEntity;
  form: FormGroup;
  serial:string

  constructor(private invGeneralInitS:InvGeneralInitService,private alertS: AlertService, private dialog: MatDialog, private invGeneraSerialS:InvGeneraSerialService, private fb: FormBuilder, public dialogRef: MatDialogRef<invSerialResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['conteo', 'codigo', 'goodDeft', 'serial', 'name', 'creationDate','active']
    this.dataSource = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.serial='';
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
    
  }


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}
delete(value:number) {
  this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea eliminar el registro ?' },
      height: '250px',
      width: '400px'
  }).afterClosed().subscribe(res => {
      if (res) {
          this.invGeneraSerialS.delete(value).subscribe(res => {
              if (res.message === 'OK') {
                  if (res.object != 0) {
                      this.alertS.open('Registro eliminado!', 'success');
                      this.invGeneraSerialS.list(this.data.id).subscribe(res => {
                          this.loading = false;
                          this.dataSource = new MatTableDataSource<any>(res.object);
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                      }, err => {
                          this.alertS.open(err, 'error');
                      });
                  } else {
                      this.alertS.open(res.message, 'error');
                  }
              } else {
                  this.alertS.open(res.message, 'error');
              }
          }, err => {
              this.alertS.open(err.message, 'error');
          });
      }
  }, err => {
      this.alertS.open(err.message, 'error');
  });
}
close(): void {
  this.dialogRef.close();
}


list() {
    this.invGeneraSerialS.list(this.data.id).subscribe(res => {
      if (res.message === "OK") {
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.alertS.open(res.message, 'error')
      }
    }, err => {
      this.alertS.open(err.message, 'error')

    }
    )
}

}
