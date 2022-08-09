import { Router } from '@angular/router';
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScpFirmImageService } from '../../services/scpFirmImage.service';

@Component({
  selector: 'app-scpFirmNew',
  templateUrl: './scpFirmNew.component.html',
  styleUrls: ['./scpFirmNew.component.css']
})
export class ScpFirmNewComponent {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  fileList: File[];
  id: number;
  form:FormGroup;
  name:string;
 
  covFormEntity: any;
  genPersonEntity: GenPersonEntity;


  constructor(private route:Router,private fb: FormBuilder,private alertS: AlertService, private scpFirmImageS:ScpFirmImageService) {
    this.formId = 0;
    this.fileList = [];
    this.name ='';
   
  }
  
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();

  }

  
  formBuilders(){
    this.form =this.fb.group({
      id:[,[]],
      name:[,[Validators.required]],
      active:[,[]],

    })
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

  save()  {
  var name = this.form.get('name').value;
    this.scpFirmImageS.loadFile(this.genPersonEntity.id, name, this.fileList).subscribe(res => {
      console.log(name)
      console.log(this.name)
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.fileList = [];
          this.alertS.open('Firma cargada','success')
        } else {
          this.alertS.open('Error al cargar el archivo!', 'error');
        }
      } else {
        this.alertS.open('El usuario tiene una firma cargada', 'warning');
      }
    }, err => {
      this.alertS.open(err.message, 'warning');
    });
  }
 
}
