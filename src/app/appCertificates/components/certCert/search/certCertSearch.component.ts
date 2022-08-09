import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CertEntity } from 'src/app/appCertificates/entities/certEntity.entity';
import { CertCertService } from 'src/app/appCertificates/servicies/certCert.service';
import { CertYearService } from 'src/app/appCertificates/servicies/certYear.service';
import { YearEntity } from 'src/app/appCertificates/entities/yearEntity.entity';
import { PeriodicityEntity } from 'src/app/appCertificates/entities/periodicityEntity.entity';
import { CertPeriodicityService } from 'src/app/appCertificates/servicies/certPeriodicity.service';
import { CertMonthService } from 'src/app/appCertificates/servicies/certMonth.service';
import { MonthEntity } from 'src/app/appCertificates/entities/monthEntity.entity';
import { CertCertUserModel } from 'src/app/appCertificates/models/CertCertUserModel.model';


@Component({
  selector: 'app-certCertSearch',
  templateUrl: './certCertSearch.component.html',
  styleUrls: ['./certCertSearch.component.css']
})
export class CertificateCertSearchComponent implements OnInit{
  public loading: boolean;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  CertEntity:CertEntity;
  yearList:YearEntity[];
  yearId:number;
  certificateList:CertEntity[];
  certificateId:number;
  periodicityId:number;
  periodicityList:PeriodicityEntity[];
  monthList:MonthEntity[];
  monthId:number;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private CertS:CertCertService, private YearS:CertYearService, private PeriodicityS:CertPeriodicityService, private MonthS:CertMonthService) {
    this.yearList = [];
    this.certificateList = [];
    this.periodicityList= [];
    this.monthList= [];
    this.yearId=0;
    this.certificateId=0;
    this.periodicityId=0;
    this.monthId=0;
  }

  //Inicializacion de la pantalla
  ngOnInit(): void {
    this.formBuilders();
    //Listado de certificados
    this.YearS.list().subscribe(res => {
      if (res.message === 'OK') {
          this.yearList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
    //Listado de certificados
    this.CertS.findAllByPersonId((JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
      if (res.message === 'OK') {
          this.certificateList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
  }

  //Validacion del formulario
  formBuilders(){
    this.form= this.fb.group({
      yearId:[,[Validators.required]],
      certificateId: [,[Validators.required]],
      periodicityId:[,[Validators.required]],
      monthId:[,[Validators.required]]
    });
  }

  getDocument(yearId:number, certificateId:number, periodicityId:number, monthId:number )
  {
    this.form.markAllAsTouched();
    //Validador de campos completos en los select
    if(yearId!=0 && certificateId!= 0 && periodicityId!=0 && monthId!=0)
    {
      //Busqueda del certificado
      this.CertS.listFile(yearId, certificateId, periodicityId, monthId, (JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res => {
        if (res.message === 'OK') {
          //Descarga de lo obtenido.
          this.downloadFile(res.object);
        } else {
            this.alertS.open(res.message, 'error');
        }
      }, err => {
          this.alertS.open(err.message, 'error');
      });
    } else
    {
      this.alertS.open('Por favor seleccionar todas las opciones', 'error');
      return;
    }
  }

  //Descargar el documento obtenido
  downloadFile(file: CertCertUserModel) {
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

  getPeriodicity(certificateId:number){
    //Listado de periodicidad
    this.PeriodicityS.findAllByCertId(certificateId).subscribe(res => {
      if (res.message === 'OK') {
          this.periodicityList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
  }

  getMonth(periodicityId:number){
    //Listado de periodicidad
    this.MonthS.findAllByPeriodicityId(periodicityId).subscribe(res => {
      if (res.message === 'OK') {
          this.monthList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
  }

}



