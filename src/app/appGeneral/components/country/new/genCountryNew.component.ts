import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';

@Component({
  selector: 'app-genCountryNew',
  templateUrl: './genCountryNew.component.html',
  styleUrls: ['./genCountryNew.component.css']
})
export class GenCountryNewComponent implements OnInit {
  @Input() countryId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genCountryEntity: GenCountryEntity;
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    active: new FormControl(''),
  });

  constructor(private genCountryS:GenCountryService, private alertS: AlertService) {
    this.countryId=0;
  }

  ngOnInit(): void {
    if (this.countryId != 0) {
      this.title = "Editar Pais";
      this.genCountryS.findById(this.countryId).subscribe(res => {
        if (res.message === 'OK') {
          this.genCountryEntity = res.object;
          this.form.setValue(
            {
              'id': this.genCountryEntity.id,
              'name': this.genCountryEntity.name,
              'active': this.genCountryEntity.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo Pais";
    }
  }
  onClick() {
    if (this.countryId === 0) {
      this.genCountryS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Pais creado!', 'success');
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
      this.genCountryS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Pais actualizado!', 'success');
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
