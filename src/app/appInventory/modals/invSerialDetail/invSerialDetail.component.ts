import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvGeneraCountingEntity } from "../../entities/invGeneraCounting.entity";
import { InvGeneralInitEntity } from "../../entities/InvGeneralInit.entity";
import { InvMasterInitService } from "../../services/invMasterInit.service";

@Component({
  selector: 'modal-invSerialDetail',
  templateUrl: './invSerialDetail.component.html',
  styleUrls: ['./invSerialDetail.component.css']
})

export class invSerialDetailComponent implements OnInit {
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
  countingType: string;
  validation:boolean;
  InvGeneraCountingEntity:InvGeneraCountingEntity;
  invGeneralInitE: InvGeneralInitEntity;
  listArrayList:InvGeneraCountingEntity[];
  compare:number;
  
  constructor(private alertS: AlertService, private dialog: MatDialog, private fb: FormBuilder, 
    public dialogRef: MatDialogRef<invSerialDetailComponent>,
    private InvMasterInitS: InvMasterInitService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['pallet', 'tipo', 'cantidad']
    this.dataSource = new MatTableDataSource([]);
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
  }

  list() {
    this.InvMasterInitS.findQuantity(this.data.id).subscribe(res => {
      if (res.message === "OK") {
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.alertS.open('Busqueda realizada','success');
      } else {
        this.alertS.open(res.message, 'error')
      }
    }, err => {
      this.alertS.open(err.message, 'error')

    }
    )
  }
  close(): void {
    this.dialogRef.close();
  }

}
