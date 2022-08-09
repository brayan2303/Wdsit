import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { Observable } from 'rxjs';
import { TasTaskEntity } from 'src/app/appTask/entities/tasTask.entity';
import { TasTaskService } from 'src/app/appTask/services/tasTask.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tasTaskNew',
  templateUrl: './tasTaskNew.component.html',
  styleUrls: ['./tasTaskNew.component.css']
})
export class TasTaskNewComponent implements OnInit {
  @Input() taskId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  personList: GenPersonEntity[];
  tasTaskEntity: TasTaskEntity;
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    requestPersonId: new FormControl('', Validators.required),
    assignedPersonId: new FormControl('', Validators.required)
  });
  filteredOptions: Observable<string[]>;

  constructor(private tasTaskS: TasTaskService, private genPersonS: GenPersonService, private alertS: AlertService) {
    this.taskId = 0;
  }

  ngOnInit() {
    this.genPersonS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.personList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    if (this.taskId != 0) {
      this.title = "Editar Tarea";
      this.tasTaskS.findById(this.taskId).subscribe(res => {
        if (res.message === 'OK') {
          this.tasTaskEntity = res.object;
          this.form.setValue(
            {
              'id': this.tasTaskEntity.id,
              'title': this.tasTaskEntity.title,
              'priority': this.tasTaskEntity.priority,
              'status': this.tasTaskEntity.status,
              'type': this.tasTaskEntity.type,
              'startDate': this.tasTaskEntity.startDate,
              'endDate': this.tasTaskEntity.endDate,
              'requestPersonId': this.tasTaskEntity.requestPersonId,
              'assignedPersonId': this.tasTaskEntity.assignedPersonId
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nueva Tarea";
    }
  }
  onClick() {
    if (this.taskId === 0) {
      this.form.controls.startDate.setValue(moment(this.form.controls.startDate.value).format('YYYY-MM-DD'));
      this.tasTaskS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Tarea creada!', 'success');
            this.form.reset();
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
      this.form.controls.startDate.setValue(moment(this.form.controls.startDate.value).format('YYYY-MM-DD'));
      this.form.controls.endDate.setValue(moment(this.form.controls.endDate.value).format('YYYY-MM-DD'));
      this.tasTaskS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Tarea actualizada!', 'success');
            this.form.reset();
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
