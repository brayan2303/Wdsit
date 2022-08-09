import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSectionService } from 'src/app/appGeneral/services/genSection.service';
import { GenModuleEntity } from 'src/app/appGeneral/entities/genModule.entity';
import { GenSectionListComponent } from '../../section/list/genSectionList.component';
import { GenModuleService } from 'src/app/appGeneral/services/genModule.service';

@Component({
  selector: 'app-genModuleNew',
  templateUrl: './genModuleNew.component.html',
  styleUrls: ['./genModuleNew.component.css']
})
export class GenModuleNewComponent implements OnInit {
  @Input() moduleId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genModuleEntity: GenModuleEntity;
  sectionList:GenSectionListComponent[];
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    sectionId: new FormControl('0',Validators.required),
    active: new FormControl(''),
  });
  constructor(private genSectionS: GenSectionService,private genModuleS:GenModuleService, private alertS: AlertService) {
    this.moduleId=0;
  }

  ngOnInit(): void {
    this.genSectionS.listAll().subscribe(res=>{
      if(res.message==='OK'){
        this.sectionList=res.object;
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if (this.moduleId != 0) {
      this.title = "Editar Modulo";
      this.genModuleS.findById(this.moduleId).subscribe(res => {
        if (res.message === 'OK') {
          this.genModuleEntity = res.object;
          this.form.setValue(
            {
              'id': this.genModuleEntity.id,
              'name': this.genModuleEntity.name,
              'link':this.genModuleEntity.link,
              'sectionId': this.genModuleEntity.sectionId,
              'active':this.genModuleEntity.active
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo Modulo";
    }
  }
  onClick() {
    if (this.moduleId === 0) {
      this.genModuleS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Modulo creado!', 'success');
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
      this.genModuleS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Modulo actualizado!', 'success');
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
