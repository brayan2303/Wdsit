import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSegmentService } from 'src/app/appGeneral/services/genSegment.service';
import { GenSegmentEntity } from 'src/app/appGeneral/entities/genSegment.entity';

@Component({
  selector: 'app-genSegmentNew',
  templateUrl: './genSegmentNew.component.html',
  styleUrls: ['./genSegmentNew.component.css']
})
export class GenSegmentNewComponent implements OnInit {
  @Input() segmentId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genSegmentEntity: GenSegmentEntity;
  form = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl(''),
  });
  constructor(private genSegmentS: GenSegmentService, private alertS: AlertService) {
    this.segmentId=0;
  }

  ngOnInit(): void {
    if (this.segmentId != 0) {
      this.title = "Editar Segmento";
      this.genSegmentS.findById(this.segmentId).subscribe(res => {
        if (res.message === 'OK') {
          this.genSegmentEntity = res.object;
          this.form.setValue(
            {
              'id': this.genSegmentEntity.id,
              'code': this.genSegmentEntity.code,
              'description':this.genSegmentEntity.description,
              'active': this.genSegmentEntity.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo Segmento";
    }
  }
  onClick() {
    if (this.segmentId === 0) {
      this.genSegmentS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Segmento creado!', 'success');
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
      this.genSegmentS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Segmento actualizado!', 'success');
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
