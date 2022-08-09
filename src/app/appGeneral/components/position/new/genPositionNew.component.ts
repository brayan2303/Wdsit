import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSegmentService } from 'src/app/appGeneral/services/genSegment.service';
import { GenPositionService } from 'src/app/appGeneral/services/genPosition.service';
import { GenPositionEntity } from 'src/app/appGeneral/entities/genPosition.entity';

@Component({
  selector: 'app-genPositionNew',
  templateUrl: './genPositionNew.component.html',
  styleUrls: ['./genPositionNew.component.css']
})
export class GenPositionNewComponent implements OnInit {
  @Input() positionId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genPositionEntity: GenPositionEntity;
  form = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl(''),
  });
  constructor(private genPositionS: GenPositionService,private genSegmentS:GenSegmentService, private alertS: AlertService) {
    this.positionId=0;
  }

  ngOnInit(): void {
    if (this.positionId != 0) {
      this.title = "Editar Cargo";
      this.genPositionS.findById(this.positionId).subscribe(res => {
        if (res.message === 'OK') {
          this.genPositionEntity = res.object;
          this.form.setValue(
            {
              'id': this.genPositionEntity.id,
              'code': this.genPositionEntity.code,
              'description':this.genPositionEntity.description,
              'active': this.genPositionEntity.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo Cargo";
    }
  }
  onClick() {
    if (this.positionId === 0) {
      this.genPositionS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Cargo creado!', 'success');
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
      this.genPositionS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Ciudad actualizada!', 'success');
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
