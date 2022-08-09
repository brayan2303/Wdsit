import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';

@Component({
  selector: 'app-genSectionNew',
  templateUrl: './genSectionNew.component.html',
  styleUrls: ['./genSectionNew.component.css']
})
export class GenSectionNewComponent implements OnInit {
  @Input() sectionId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genSectionEntity: GenSectionEntity;
  applicationList:GenApplicationEntity[];
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
    color: new FormControl('',Validators.required),
    applicationId: new FormControl('',Validators.required),
    position: new FormControl(0,Validators.required),
    active: new FormControl(''),
  });
  constructor(private genSectionS: GenSectionService,private genApplicationS:GenApplicationService, private alertS: AlertService) {
    this.sectionId=0;
  }

  ngOnInit(): void {
    this.genApplicationS.list().subscribe(res=>{
      if(res.message==='OK'){
        this.applicationList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if (this.sectionId != 0) {
      this.title = "Editar Seccion";
      this.genSectionS.findById(this.sectionId).subscribe(res => {
        if (res.message === 'OK') {
          this.genSectionEntity = res.object;
          this.form.setValue(
            {
              'id': this.genSectionEntity.id,
              'name': this.genSectionEntity.name,
              'icon':this.genSectionEntity.icon,
              'color': this.genSectionEntity.color,
              'applicationId':this.genSectionEntity.applicationId,
              'position':this.genSectionEntity.position,
              'active':this.genSectionEntity.active
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nueva Seccion";
    }
  }
  onClick() {
    if (this.sectionId === 0) {
      this.genSectionS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Seccion creada!', 'success');
          } else {
            this.alertS.open(res.message, 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.genSectionS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Seccion actualizada!', 'success');
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
  }
}
