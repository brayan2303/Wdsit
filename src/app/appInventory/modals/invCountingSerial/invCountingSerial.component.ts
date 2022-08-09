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
import { InvGeneralInitEntity } from "../../entities/InvGeneralInit.entity";
import { InvSerialComponent } from "../invSerial/invSerial.component";

@Component({
  selector: 'modal-invCountingSerial',
  templateUrl: './invCountingSerial.component.html',
  styleUrls: ['./invCountingSerial.component.css']
})

export class InvCountingSerialComponent implements OnInit {
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
  
  constructor(private invGeneralInitS: InvGeneralInitService, private alertS: AlertService, private dialog: MatDialog, private invGeneraCountingS: InvGeneraCountingService, private fb: FormBuilder, public dialogRef: MatDialogRef<InvCountingSerialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['conteo', 'codigo', 'goodDeft', 'counting', 'name', 'creationDate', 'active', 'Acciones']
    //, 'Acciones'
    this.dataSource = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.countingType = '';
    this.validation = false;
    this.InvGeneraCountingEntity= new InvGeneraCountingEntity();
    this.invGeneralInitE = new InvGeneralInitEntity();
    this.listArrayList = [];
    this.compare = 0;
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
    this.listSum();
    this.listArray();
  }


  validador(event: KeyboardEvent) {
    if (event.key == 'Tab' || event.key == 'Enter') {
      const input: HTMLInputElement = this.searchElement.nativeElement as HTMLInputElement;
      input.value = '';
      input.focus();
      input.select();
      this.save();
    }
  }

  save() {
      this.invGeneraCountingS.create(Number(this.countingType), this.data.id, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro creado', 'success');
            this.list();
            this.listSum();
            this.listArray()
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
  list() {
    this.invGeneraCountingS.list(this.data.id).subscribe(res => {
      if (res.message === "OK") {
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        if(this.dataSource.data.length === 0){
          this.save();
        }else{
        }
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
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
                this.listSum();
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

  init() {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea finalizar el conteo ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if(res){
      this.invGeneralInitS.update(this.data.id).subscribe(resL => {
        if (resL.message === 'OK') {
          this.alertS.open('Conteo finalizado!', 'success');
          this.dialogRef.close();
          
        } else {
          this.alertS.open(res.message, 'error')
        }
      })
    }
      
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  search() {
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
  listArray() {
    this.compare = 0;
    this.invGeneraCountingS.list(this.data.id).subscribe(res => {
      if (res.message === "OK") {
        this.listArrayList=res.object
        for (let index = 0; index < this.listArrayList.length; index++) {
          const element = this.listArrayList[index];
          this.compare = this.listArrayList[0].counting;
        }
      } else {
        this.alertS.open(res.message, 'error')
      }
    }, err => {
      this.alertS.open(err.message, 'error')

    }
    )
  }
  serial(id: number) {
    this.dialog.open(InvSerialComponent, {
        width: '100%',
        data: { id: id }
    }).afterClosed().subscribe(res => {
      this.listArray();
      this.list()
    })
    this.listArray();
    this.list()
}

}
