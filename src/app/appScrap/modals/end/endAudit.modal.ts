
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ScpTextAudiEntity } from 'src/app/appScrap/entities/scpTextAudi.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ScpTextAudiService } from '../../components/services/scpTextAudi.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScpAuditSerialService } from '../../components/services/scpAuditSerial.service';
import { ScpAuditService } from '../../components/services/scpAudit.service';
import { ScpMotifEntity } from '../../entities/scpMotif.entity';


@Component({
  selector: 'app-endAudit',
  templateUrl: './endAudit.modal.html',
  styleUrls: ['./endAudit.modal.css']
})
export class EndAuditComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  title:string;
  fileList: File[];
  form: FormGroup;
  scpTextAudiE:ScpTextAudiEntity
  genPersonEntity: GenPersonEntity;
  ScpMotifList: ScpMotifEntity[];
  
  constructor(private scpAuditS:ScpAuditService,private scpAuditSerialS: ScpAuditSerialService,private fb: FormBuilder,private alertS: AlertService,private scpTextAudiS:ScpTextAudiService, public dialogRef: MatDialogRef<EndAuditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formId = 0;
    this.fileList = [];
    this.fileList = [];
  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
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

updateClose(id: number) {
  this.scpAuditSerialS.updateClose(id).subscribe(resU => {
    if (resU.message === 'OK') {
      this.alertS.open('Auditoria cerrada, Por favor dirigirse a Resultado de auditoria', 'succes');
    } else {
      this.alertS.open(resU.message, 'error');
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