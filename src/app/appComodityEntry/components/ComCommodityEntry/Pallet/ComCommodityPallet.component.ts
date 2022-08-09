import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ComCommodityPalletModel } from 'src/app/appComodityEntry/models/comCommodityPalletModel';
import { ComCommodityEntryService } from 'src/app/appComodityEntry/services/ComCommodityEntryService';


@Component({
  selector: 'app-ComCommodityPallet',
  templateUrl: './ComCommodityPallet.component.html',
  styleUrls: ['./ComCommodityPallet.component.css']
})
export class ComCommodityPalletComponent implements OnInit{
  title:string;
  form: FormGroup;
  codeEntry:string;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private ComEntryS:ComCommodityEntryService) {
    this.codeEntry='';
  }
  ngOnInit(): void {
    this.title='Generar Pallet';
    this.formBuilders();
  }

  

  //Validacion del formulario
  formBuilders(){
    this.form= this.fb.group({
      codeEntry:[,[Validators.required]]
    });
  }

  
  getDocument(){
    //Busqueda del certificado
  this.ComEntryS.getPallet(this.codeEntry).subscribe(res => {
    if (res.message === 'OK') {
      //Descarga de lo obtenido.
      this.downloadFile(res.object);
    } else {
        this.alertS.open(res.message, 'error');
    }
  }, err => {
      this.alertS.open(err.message, 'error');
  });
}

  //Descargar el documento obtenido
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

}



