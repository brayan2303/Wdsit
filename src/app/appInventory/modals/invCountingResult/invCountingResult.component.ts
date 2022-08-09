import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvGeneraCountingService } from "../../services/invGeneraCounting.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { InvGeneralInitService } from "../../services/invGeneralInit.service";
import { InvGeneraCountingEntity } from "../../entities/invGeneraCounting.entity";

@Component({
  selector: 'modal-invCountingResult',
  templateUrl: './invCountingResult.component.html',
  styleUrls: ['./invCountingResult.component.css']
})

export class InvCountingResultComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  @ViewChild('counting') searchElement: ElementRef;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;
  genPersonEntity: GenPersonEntity;
  form: FormGroup;
  countingType:string;
  InvGeneraCountingEntity:InvGeneraCountingEntity;
  constructor(private invGeneralInitS: InvGeneralInitService, private alertS: AlertService, private dialog: MatDialog, private invGeneraCountingS: InvGeneraCountingService, private fb: FormBuilder, public dialogRef: MatDialogRef<InvCountingResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['conteo', 'codigo', 'goodDeft', 'counting', 'name', 'creationDate', 'active']
    this.dataSource = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.countingType='';
    this.InvGeneraCountingEntity= new InvGeneraCountingEntity();
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
    this.listSum(); 
  }

  list() {
    this.invGeneraCountingS.list(this.data.id).subscribe(res => {
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
  listSum() {
    this.invGeneraCountingS.findByIdSum(this.data.id).subscribe(res => {
      if (res.message === "OK") {
       this.InvGeneraCountingEntity=res.object;

      } else {
        this.alertS.open(res.message, 'error')
      }
    }, err => {
      this.alertS.open(err.message, 'error')

    }
    )
  }
  
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(value: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea eliminar el registro ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.invGeneraCountingS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.invGeneraCountingS.list(this.data.id).subscribe(res => {
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


  search(){
    this.invGeneralInitS.list().subscribe(res => {
        if (res.message === 'OK') {
            this.loading = false;
            this.dataSource = new MatTableDataSource<any>(res.object);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        } else {
            this.alertS.open(res.message, 'error');
        }
    }, err => {
        this.alertS.open(err.message, 'error');
    });


}

}
