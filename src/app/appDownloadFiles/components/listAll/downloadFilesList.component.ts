import { Component, OnInit } from '@angular/core';
import { FilSerialService } from 'src/app/appFile/services/filSerial.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { LoadPersonCustomerService } from 'src/app/appLoadClient/services/loadPersonCustomer.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DownloadFilesModel } from '../../models/downloadFiles.model';
import { DownloadFilesClaroFontModel } from '../../models/downloadFilesClaroFont.model';
import { DownloadFilesClaroSmartModel } from '../../models/downloadFilesClaroSmart.model';
import { DownloadFilesDirectvModel } from '../../models/downloadFilesDirectv.model';
import { DownloadFilesDirectvSmartModel } from '../../models/downloadFilesDirectvSmart.model';
import { DownloadFilesEtbModel } from '../../models/downloadFilesEtb.model';
import { DownloadFilesHughesModel } from '../../models/downloadFilesHughes.model';
import { DownloadFilesPlataformaModel } from '../../models/downloadFilesPlataforma.model';
import { DownloadFilesRedModel } from '../../models/downloadFilesRed.model';
import { DownloadFilesTigoModel } from '../../models/downloadFilesTigo.model';
import { DownloadFilesService } from '../../services/downloadFiles.service';

@Component({
  selector: 'app-downloadFilesList',
  templateUrl: './downloadFilesList.component.html',
  styleUrls: ['./downloadFilesList.component.css']
})
export class DownloadFilesListComponent implements OnInit {
  fileList: DownloadFilesModel[];
  fileListCLaroSmart: DownloadFilesClaroSmartModel[];
  fileListClaroFont: DownloadFilesClaroFontModel[];
  fileListDirectv: DownloadFilesDirectvModel[];
  fileListDirectvSmart: DownloadFilesDirectvSmartModel[];
  fileListTigo: DownloadFilesTigoModel[];
  fileListEtb: DownloadFilesEtbModel[];
  fileListHughes: DownloadFilesHughesModel[];
  fileListTigoM: DownloadFilesTigoModel[];
  fileListRed: DownloadFilesRedModel[];
  fileListPlataforma: DownloadFilesPlataformaModel[];
  statusCl:string;
  statusClS:string;
  statusClF:string;
  statusDr:string;
  statusDrS:string;
  statusEt:string;
  statusHg:string;
  statusPm:string;
  statusRe:string;
  statusTib:string;
  statusTiM:string;
  customer: GenCustomerEntity;
  loadingCl: boolean;
  loadingClS: boolean;
  loadingClF: boolean;
  loadingDr: boolean;
  loadingDrs: boolean;
  loadingEt: boolean;
  loadingHg: boolean;
  loadingPm: boolean;
  loadingRe: boolean;
  loadingTiM: boolean;
  loadingTib: boolean;

  constructor(private downloadFilesS: DownloadFilesService, private loadCustomerPersoS: LoadPersonCustomerService, private alertS: AlertService) {
    this.fileList = [];
    this.fileListCLaroSmart = [];
    this.fileListClaroFont = [];
    this.fileListDirectv = [];
    this.fileListDirectvSmart = [];
    this.fileListTigo = [];
    this.fileListEtb = [];
    this.fileListHughes = [];
    this.fileListTigoM = [];
    this.fileListRed = [];
    this.fileListPlataforma = [];
    this.customer = new GenCustomerEntity();
    this.statusCl = '';
    this.statusClS = '';
    this.statusClF = '';
    this.statusDr = '';
    this.statusDrS = '';
    this.statusEt = '';
    this.statusHg = '';
    this.statusPm = '';
    this.statusRe = '';
    this.statusTib = '';
    this.statusTiM = '';
    this.loadingCl = true;
    this.loadingClS = true;
    this.loadingClF = true;
    this.loadingDr = true;
    this.loadingDrs = true;
    this.loadingEt = true;
    this.loadingHg = true;
    this.loadingPm = true;
    this.loadingRe = true;
    this.loadingTiM = true;
    this.loadingTib = true;
  }

  ngOnInit() {
    this.customers();
  }

  customers() {
    this.downloadFilesS.findCustomerByPersonIdList(Number(JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
      if (res.message === 'OK') {
        this.customer = res.object;
        console.log(this.customer.description);
        if (this.customer.description == 'CLARO') {
          this.filesClaro();
          this.filesClaroSmart();
          this.filesClaroFont();
          this.filesPlataforma();
          this.filesRedExterna();
        } else if (this.customer.description == 'ETB') {
          this.filesEtb();
        } else if (this.customer.description == 'HUGHES') {
          this.filesHughes();
        } else if (this.customer.description == 'TIGO') {
          this.filesTigo();
          this.filesTigoMedellin();
        }else if(this.customer.description == 'DIRECTV'){
          this.filesDirectv();
          this.filesDirectvSmart(); 
        }else{
          
        }
      } else { this.alertS.open(res.message, 'error'); }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }


  filesClaro() {
    this.loadingCl=false;
    this.downloadFilesS.listFileClaro().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileList = resL.object;
        if(this.fileList.length != 0){
          this.statusCl = 'CLARO';
          this.loadingCl=true;
        }else{
          this.statusCl = 'CLARO EN ACTUALIZACION...';
          this.loadingCl=false;
        }
        
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesClaroSmart() {
    this.loadingClS = false;
    this.downloadFilesS.listFileClaroSmart().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListCLaroSmart = resL.object;
        if(this.fileListCLaroSmart.length != 0){
          this.statusClS = 'CLARO SMARTCARD';
          this.loadingClS = true;
        }else{
          this.statusClS = 'CLARO SMARTCARD EN ACTUALIZACION...';
          this.loadingClS = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesClaroFont() {
    this.loadingClF = false;
    this.downloadFilesS.listFileClaroFont().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListClaroFont = resL.object;
        if(this.fileListClaroFont.length != 0){
          this.statusClF = 'CLARO FONTIBON';
          this.loadingClF = true;
        }else{
          this.statusClF = 'CLARO FONTIBON EN ACTUALIZACION...';
          this.loadingClF = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesDirectv() {
    this.loadingDr = false;
    this.downloadFilesS.listFileDirectv().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListDirectv = resL.object;
        if(this.fileListDirectv.length != 0){
          this.statusDr = 'DIRECTV';
          this.loadingDr = true;
        }else{
          this.statusDr = 'DIRECTV EN ACTUALIZACION...';
          this.loadingDr = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesDirectvSmart() {
    this.loadingDrs = false;
    this.downloadFilesS.listFileDirectvSmart().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListDirectvSmart = resL.object;
        if(this.fileListDirectvSmart.length != 0){
          this.statusDrS = 'DIRECTV SMARTCARD';
          this.loadingDrs = true;
        }else{
          this.statusDrS = 'DIRECTV SMARTCARD EN ACTUALIZACION...';
          this.loadingDrs = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesEtb() {
    this.loadingEt = false;
    this.downloadFilesS.listFileEtb().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListEtb = resL.object;
        if(this.fileListEtb.length != 0){
          this.statusEt = 'ETB';
          this.loadingEt = true;
        }else{
          this.statusEt = 'ETB EN ACTUALIZACION...';
          this.loadingEt = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesHughes() {
    this.loadingHg = false;
    this.downloadFilesS.listFileHughes().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListHughes = resL.object;
        if(this.fileListHughes.length != 0){
          this.statusHg = 'HUGHES';
          this.loadingHg = true;
        }else{
          this.statusHg = 'HUGHES EN ACTUALIZACION...';
          this.loadingHg = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesTigo() {
    this.loadingTib=false;
    this.downloadFilesS.listFileTigo().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListTigo = resL.object;
        if(this.fileListTigo.length != 0){
          this.statusTib = 'TIGO BOGOTA';
          this.loadingTib = true;
        }else{
          this.statusTib = 'TIGO BOGOTA EN ACTUALIZACION...';
          this.loadingTib = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesTigoMedellin() {
    this.loadingTiM = false
    this.downloadFilesS.listFileTigoMedellin().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListTigoM = resL.object;
        if(this.fileListTigoM.length != 0){
          this.statusTiM = 'TIGO MEDELLIN';
          this.loadingTiM = true;
        }else{
          this.statusTiM = 'TIGO MEDELLIN EN ACTUALIZACION...';
          this.loadingTiM = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesRedExterna() {
    this.loadingRe = false
    this.downloadFilesS.listFileRedExterna().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListRed = resL.object;
        if(this.fileListRed.length != 0){
          this.statusRe = 'RED EXTERNA';
          this.loadingRe=true;
        }else{
          this.statusRe = 'RED EXTERNA EN ACTUALIZACION...';
          this.loadingRe=false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  
  filesPlataforma() {
    this.loadingPm = false
    this.downloadFilesS.listPlatafoma().subscribe(resL => {
      if (resL.message === 'OK') {
        this.fileListPlataforma = resL.object;
        if(this.fileListPlataforma.length != 0){
          this.statusPm = 'PLATAFORMA MOVIL';
          this.loadingPm = true;
        }else{
          this.statusPm = 'PLATAFORMA MOVIL EN ACTUALIZACION...';
          this.loadingPm = false;
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  download(file: DownloadFilesModel) {
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

}
