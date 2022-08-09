import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSerialSearchModel } from 'src/app/appFile/models/fileSerialSearch.model';
import { FilSerialModel } from 'src/app/appFile/models/filSerial.model';
import { FilSerialService } from 'src/app/appFile/services/filSerial.service';
import { PqrPqrsFileModel } from 'src/app/appPqrs/models/pqrPqrsFile.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-filSerialSearch',
  templateUrl: './filSerialSearch.component.html',
  styleUrls: ['./filSerialSearch.component.css']
})
export class FilSerialSearchComponent implements OnInit {
  serial: string;
  filSerialModel: FilSerialModel;
  fileList: PqrPqrsFileModel[];
  serialModel: FileSerialSearchModel;
  loading: boolean;

  constructor(private filSerialS: FilSerialService, private alertS: AlertService, private dialog: MatDialog) {
    this.serial = '';
    this.fileList = [];
    this.serialModel = null;
  }

  ngOnInit() {

  }
  search() {
    if (this.serial != '') {
      this.filSerialS.serialSearch(this.serial).subscribe(res => {
        if (res.message === 'OK') {
          this.serialModel = res.object;
          this.files();
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.alertS.open('Ingrese un serial!', 'warning');
    }
  }
  files() {
    this.filSerialS.listFile(String(this.serialModel.id), String(this.serialModel.cardNameId), 'INICIO').subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileList = resL.object;
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  download(file: PqrPqrsFileModel) {
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
      var blob = new Blob([bytes], { type: "application/" + file.type });
      downloadLink.href = window.URL.createObjectURL(blob);
    }
    downloadLink.setAttribute("download", file.name);
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  serialSearch() {
    this.loading = true;
    this.filSerialS.serialSearch(this.serial).subscribe(res=>{
      if(res.message==='OK'){
        if(res.object!=null){
          this.serialModel=res.object;
        }else{
          this.alertS.open('Serial no encontrado!','warning');
        }
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
  }
}
