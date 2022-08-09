import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenProfileService } from 'src/app/appGeneral/services/genProfile.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenProfileEntity } from 'src/app/appGeneral/entities/genProfile.entity';
import { GenApplicationEntity } from 'src/app/appGeneral/entities/genApplication.entity';
import { GenApplicationService } from 'src/app/appGeneral/services/genApplication.service';

@Component({
  selector: 'app-genProfileNew',
  templateUrl: './genProfileNew.component.html',
  styleUrls: ['./genProfileNew.component.css']
})
export class GenProfileNewComponent implements OnInit {
  @Input() profileId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genProfileEntity: GenProfileEntity;
  newForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    applicationId: new FormControl('', Validators.required),
    active: new FormControl(''),
  });
  applicationList: GenApplicationEntity[];

  constructor(private genProfileS: GenProfileService, private genApplicationS: GenApplicationService, private alertS: AlertService) {
    this.profileId = 0;
  }

  ngOnInit(): void {
    this.genApplicationS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.applicationList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    if (this.profileId != 0) {
      this.title = "Editar Perfil";
      this.genProfileS.findById(this.profileId).subscribe(res => {
        if (res.message === 'OK') {
          this.genProfileEntity = res.object;
          this.newForm.setValue(
            {
              'id': this.genProfileEntity.id,
              'name': this.genProfileEntity.name,
              'applicationId': this.genProfileEntity.applicationId,
              'active': this.genProfileEntity.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo Perfil";
    }
  }
  onClick() {
    if (this.profileId === 0) {
      this.genProfileS.create(this.newForm.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Perfil creado!', 'success');
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
      this.genProfileS.update(this.newForm.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Perfil actualizado!', 'success');
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
