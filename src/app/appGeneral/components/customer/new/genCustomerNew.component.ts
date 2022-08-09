import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';

@Component({
  selector: 'app-genCustomerNew',
  templateUrl: './genCustomerNew.component.html',
  styleUrls: ['./genCustomerNew.component.css']
})
export class GenCustomerNewComponent implements OnInit {
  @Input() customerId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genCustomerEntity: GenCustomerEntity;
  form = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl(''),
  });
  constructor(private genCustomerS: GenCustomerService, private alertS: AlertService) {
    this.customerId=0;
  }

  ngOnInit(): void {
    if (this.customerId != 0) {
      this.title = "Editar Cliente";
      this.genCustomerS.findById(this.customerId).subscribe(res => {
        if (res.message === 'OK') {
          this.genCustomerEntity = res.object;
          this.form.setValue(
            {
              'id': this.genCustomerEntity.id,
              'code': this.genCustomerEntity.code,
              'description':this.genCustomerEntity.description,
              'active': this.genCustomerEntity.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo Cliente";
    }
  }
  onClick() {
    if (this.customerId === 0) {
      this.genCustomerS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Cliente creado!', 'success');
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
      this.genCustomerS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Cliente actualizado!', 'success');
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
