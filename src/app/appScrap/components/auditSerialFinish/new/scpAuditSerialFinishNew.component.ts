import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ScpAuditSerialService } from '../../services/scpAuditSerial.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ScpAuditSerialModel } from 'src/app/appScrap/models/scpAuditSerial.model';
import { ScpAuditSerialFinishService } from '../../services/scpAuditSerialFinish.service';
import { EndAuditComponent } from 'src/app/appScrap/modals/end/endAudit.modal';
import { ComCommodityPalletModel } from 'src/app/appComodityEntry/models/comCommodityPalletModel';
import { ScpRejectModel } from 'src/app/appScrap/models/ScpReject.mode';


@Component({
  selector: 'app-scpAuditSerialFinishNew',
  templateUrl: './scpAuditSerialFinishNew.component.html',
  styleUrls: ['./scpAuditSerialFinishNew.component.css']
})
export class ScpAuditSerialFinishNewComponent implements OnInit {
  columns: string[];
  columnsSerial: string[];
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  levelRuleId:number;
  dataSourceSerial = new MatTableDataSource<any>();
  @ViewChild(MatSort) sortSerial: MatSort;
  @ViewChild('paginator') paginatorSerial: MatPaginator;
  id: number;
  scpAuditSerialM: ScpAuditSerialModel;
  vars:string;
  report:number;
  ScpRejectModel:ScpRejectModel;
  constructor(private dialog: MatDialog, private alertS: AlertService, private ScpAuditSerialFinishS: ScpAuditSerialFinishService) {
    this.formId = 0;
    this.columns = ['codeAudit', 'auditPreviousName', 'typeAuditName', 'state', 'levelRuleName', 'userName', 'active'];
    this.columnsSerial = ['serial', 'mac', 'sapCode', 'description', 'technical', 'repairDate', 'scrapMotif','state','stateMotif','creationDate'];
    this.dataSource = new MatTableDataSource([]);
    this.dataSourceSerial = new MatTableDataSource([]);
    this.id = 0;
    this.scpAuditSerialM = null;
    this.levelRuleId=0;
    this.vars = '';
    this.report = 0;
    this.ScpRejectModel = null;

  }
  ngOnInit(): void {

    this.list()

  }
  list() {
    this.ScpAuditSerialFinishS.listAudit().subscribe(res => {
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

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  getInformation(levelRuleId:number){
    console.log(levelRuleId)
    this.levelRuleId=levelRuleId;
    this.listSerial(levelRuleId);
    this.register(this.levelRuleId);
    this.listCount(levelRuleId);
    
}

listCount(levelRuleId:number){
    this.ScpAuditSerialFinishS.listCount(levelRuleId).subscribe(resP => {
      if (resP.message === 'OK') {
        this.ScpRejectModel = resP.object;

        this.report = resP.object.reject
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });

}

generateReport(id:number){
  this.ScpAuditSerialFinishS.generateReport(id).subscribe(resP => {
    console.log(id)
    if (resP.message === 'OK') {
      this.downloadFile(resP.object)
      this.alertS.open('Archivo realizado','success')
    } else {
      this.alertS.open(resP.message, 'error');
    }
  }, err => {
    this.alertS.open(err.message, 'error');
  });

}
downloadFile(file: ComCommodityPalletModel) {
  var downloadLink = document.createElement("a");
  if (file.type === 'imagen') {
      downloadLink.setAttribute("href", "data:image/png;base64," + file.file);
  } else {
      var binary = window.atob(file.file);
      var binaryLength = binary.length;
      var bytes = new Uint8Array(binaryLength);
      for (var i = 0; i < binaryLength; i++) {
          var ascii = binary.charCodeAt(i);
          bytes[i] = ascii;
      }
      var blob = new Blob([bytes], { type: "application/" + file.type});
      downloadLink.href = window.URL.createObjectURL(blob);
  }
  downloadLink.setAttribute("download", file.name+'.'+file.type);
  downloadLink.style.visibility = "hidden";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  }
getRegisSerial(id: string) {
  const dialogRef = this.dialog.open(EndAuditComponent, {
    data: { id: id },
    width: '100%'
  });
  dialogRef.afterClosed().subscribe(resA => {
  }, err => {
    this.alertS.open(err.message, 'error');
});
}


  listSerial(levelRuleId: number) {
    this.vars ='/';
    this.ScpAuditSerialFinishS.listAuditSerial(levelRuleId).subscribe(res => {
      if (res.message === 'OK') {
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

  register(levelRuleId: number) {
    this.ScpAuditSerialFinishS.listLevel(levelRuleId).subscribe(resP => {
      if (resP.message === 'OK') {
        this.scpAuditSerialM = resP.object;
      } else {
        this.alertS.open(resP.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

}
















