import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScpAuditSerialModel } from 'src/app/appScrap/models/scpAuditSerial.model';
import { ScpResultService } from '../../components/services/scpResult.serivice';
import { ScpAuditSerialService } from '../../components/services/scpAuditSerial.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScpMotifEntity } from '../../entities/scpMotif.entity';
import { ScpAuditService } from '../../components/services/scpAudit.service';


@Component({
  selector: 'app-noCrossingAudirt',
  templateUrl: './noCrossingAudirt.modal.html',
  styleUrls: ['./noCrossingAudirt.modal.css']
})
export class NoCrossingAudirtomponent implements OnInit {
  columns: string[];
  columnsSerial: string[];
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  levelRuleId: number;
  dataSourceSerial = new MatTableDataSource<any>();
  @ViewChild(MatSort) sortSerial: MatSort;
  @ViewChild('paginator') paginatorSerial: MatPaginator;
  id: number;
  scpAuditSerialM: ScpAuditSerialModel;
  vars: string;
  auditId:number;
  fileList: File[];
  form: FormGroup;
  ScpMotifList: ScpMotifEntity[];
  

  constructor( private scpAuditS:ScpAuditService,public dialogRef: MatDialogRef<NoCrossingAudirtomponent>,private fb: FormBuilder,private scpResultS:ScpResultService,private dialog: MatDialog, private alertS: AlertService, private scpAuditSerialS: ScpAuditSerialService, private ScpResultS :ScpResultService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formId = 0;
    this.columns = ['serial', 'descripcion', 'codigoSap', 'motivoScrap'];
    this.columnsSerial = ['serial', 'descripcion', 'codigoSap', 'motivoScrap'];
    this.dataSource = new MatTableDataSource([]);
    this.dataSourceSerial = new MatTableDataSource([]);
    this.id = 0;
    this.scpAuditSerialM = null;
    this.levelRuleId = 0;
    this.vars = '';
    this.auditId = 0;
    this.fileList = [];

  }
  ngOnInit(): void {
    this.formBuilders();
    this.list();
    this.getInformation(this.data.id);
    this.scpAuditSerialS.listMotif().subscribe(res => {
      if (res.message === 'OK') {
          this.ScpMotifList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
  }, err => {
      this.alertS.open(err.message, 'error');
  });
  }
  list() {
    this.scpAuditSerialS.listAudit().subscribe(res => {
      if (res.message === 'OK') {
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });

  }


  getInformation(auditId: number) {
    this.auditId = auditId;
    this.register(auditId);
    this.listResult(auditId);
    this.listCrossing(auditId);

  }


  register(auditId: number) {
    this.scpAuditSerialS.listLevel(auditId).subscribe(resP => {
      if (resP.message === 'OK') {
        this.scpAuditSerialM = resP.object;
        console.log(resP.object)
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
 
  listResult(auditId:number){
    this.scpResultS.resultSerial(auditId).subscribe(res =>{
      if (res.message === 'OK') {
        console.log(res.object)
        this.loading = false;
        this.dataSourceSerial = new MatTableDataSource<any>(res.object);
        this.dataSourceSerial.paginator = this.paginatorSerial;
        this.dataSourceSerial.sort = this.sortSerial;
      } else {
        this.alertS.open(res.message, 'error');
      }

    }, err => {
      this.alertS.open(err.message, 'error');
    });

  }
  listCrossing(auditId:number){
    console.log(auditId)
    this.scpResultS.resultCrossing(auditId).subscribe(res => {
      if (res.message === 'OK') {
        console.log(res.object)
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

  updateClose(id: number) {
    this.scpAuditSerialS.updateClose(id).subscribe(resU => {
      if (resU.message === 'OK') {
        this.alertS.open('Auditoria cerrada', 'succes');
        this.list()
      } else {
        this.alertS.open(resU.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });

  }

  
  formBuilders(){
    this.form= this.fb.group({
      id: [,[]],
      name:[,[]],
      description:[,[Validators.required]],
      active: [,[]]
      //[,[Validators.required]],
    })

  }
  close(status: boolean): void {
    this.dialogRef.close(status);
}
 
  save() {
    var description = this.form.controls.description.value;
    if(this.formId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.scpAuditSerialS.loadFile(this.data.id,description, this.fileList).subscribe(res => {
          if (res.message === 'OK') {
              if (res.object != 0) {
                  this.fileList = [];
                  this.updateClose(this.data.id);
                  this.updateRejected(this.data.id);
              } else {
                  this.alertS.open('Error al cargar el archivo!', 'error');
              }
          } else {
              this.alertS.open(res.message, 'error');
          }
      }, err => {
          this.alertS.open(err.message, 'error');
      });
    }else{
    }       
 
}

addFile(file: FileList) {
  if (file != undefined) {
      for (let i = 0; i < file.length; i++) {
          this.fileList.push(file[i]);
      }
  }
}
removeFile(i: number) {
  this.fileList.splice(i, 1);
}
loadFile(id:number,serial: string) {
  console.log(serial)
  this.scpAuditSerialS.loadFile(id,serial, this.fileList).subscribe(res => {
    console.log(serial)
      if (res.message === 'OK') {
          if (res.object != 0) {
              this.fileList = [];
          } else {
              this.alertS.open('Error al cargar el archivo!', 'error');
          }
      } else {
          this.alertS.open(res.message, 'error');
      }
  }, err => {
      this.alertS.open(err.message, 'error');
  });
}

updateRejected(id:number){
  this.scpAuditS.updateAuditRejected(id).subscribe(resU => {
    if (resU.message === 'OK') {
      this.alertS.open('Auditoria cerrada, Por favor dirigirse a Resultado de auditoria', 'succes');
    } else {
      this.alertS.open(resU.message, 'error');
    }
  }, err => {
    this.alertS.open(err.message, 'error');
  });

}

}







