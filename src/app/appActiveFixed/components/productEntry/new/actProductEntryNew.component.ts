import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { ActiveFixedEntryService } from 'src/app/appActiveFixed/services/activeFixedEntry.service';
import { ActiveFixedAssigmentEntity } from 'src/app/appActiveFixed/entities/activeFixedAssigment.entity';
import { ActiveFixedAssigmentService } from 'src/app/appActiveFixed/services/activeFixedAssigment.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
@Component({
  selector: 'app-actProductEntryNew',
  templateUrl: './actProductEntryNew.component.html',
  styleUrls: ['./actProductEntryNew.component.css']
})
export class ActProductEntryNewComponent implements OnInit {
  public loading: boolean;
  public data: any;
  public product: Number;
  @Input() ActFixExitformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  tracingList : ActiveFixedAssigmentEntity[];
  form: FormGroup;
  genPersonEntity: GenPersonEntity;
  name:string;
   identification:string;
   area:string;
    position:string; 
    equipment: string;
    serial: string;
  serialEquipment: string;



  constructor(private activeFixedAssigmentS:ActiveFixedAssigmentService, private activeFixedAsigmentS: ActiveFixedAssigmentService, private activeFixedEntryS: ActiveFixedEntryService, private fb: FormBuilder, private genPersonS: GenPersonService, private alertS: AlertService) {
    this.ActFixExitformId = 0;
    this.serial = '';
    this.serialEquipment = '';
    this.name = '';
    this.identification = '';
    this.area = '';
    this.position = '';
    this.equipment = '';



  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();


  }

  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      identification: [, [Validators.required]],
      name: [, [Validators.required]],
      area: [, [Validators.required]],
      position: [, [Validators.required]],
      equipment: [, [Validators.required]],
      serial: [, [Validators.required]],
      associatedSerial: [,[]],
      serialEquipment: [, [Validators.required]]

    })

  }
  save() {
    if (this.form.controls.associatedSerial.value === this.form.controls.serialEquipment.value) {
    if (this.ActFixExitformId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.activeFixedEntryS.create(this.genPersonEntity.id,this.form.controls.serial.value, this.form.controls.name.value, 
        this.form.controls.identification.value, this.form.controls.area.value, this.form.controls.position.value, this.form.controls.equipment.value, this.form.controls.associatedSerial.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.updatexit();
            this.form.reset()
            this.alertS.open('Entrada de equipo exitosa!', 'success');
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
      this.alertS.open('Error al registrar', 'error');
    }
  } else {
    this.alertS.open('El serial del cargador no es el asignado, por favor verificar', 'warning');
  }
  }

  search() {
    this.tracingList = [];
    this.activeFixedEntryS.findBySerial(this.form.get('serial').value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != null) {

          this.form.get('name').setValue(res.object.name);
          this.form.get('area').setValue(res.object.costCenter);
          this.form.get('position').setValue(res.object.position);
          this.form.get('equipment').setValue(res.object.product);
          this.form.get('identification').setValue(res.object.identification);
          this.form.get('associatedSerial').setValue(res.object.nameProduct);

        } else {
          this.form.controls.Name.enable();
          this.form.controls.email.enable();
        }
      } else {
        this.alertS.open(res.message, 'error');
        this.form.controls.Name.enable();
        this.form.controls.email.enable();
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
 

  aprovedRejected( status: boolean) {
    this.activeFixedAsigmentS.entryExit(this.form.controls.serial.value, this.data.status).subscribe(res => {
       if (res.message === 'OK') {
           if (res.object != 0) {
             this.alertS.open(status === true ? 'Salida!' : 'Entrada!', 'success');
                this.loading = true,
                    this.activeFixedAsigmentS.listExitVerif().subscribe(res => {
                        if (res.message === 'OK') {
                           this.loading = false;
                        } else {
                          this.alertS.open(res.message, 'error');
                      }
                    }, err => {
                      this.alertS.open(err.message, 'error');
                 });
         } else {
                this.alertS.open(status === true ? 'Error al salir!' : 'Error al entrar!', 'error');
            }
       } else {
           this.alertS.open(res.message, 'error');
       }
    }, err => {
        this.alertS.open(err.message, 'error');
   });
}
updatexit(){
  this.activeFixedAssigmentS.entryExit(this.form.controls.serial.value, false).subscribe(res => {
    if(res.message=== 'OK'){
      if(res.object !=0){
           this.alertS.open('Ingreso confirmado', 'success');
      }else{
        this.alertS.open(res.message, 'error');
      }

    }else{
      this.alertS.open(res.message, 'error');
    }
  }), err =>{
    this.alertS.open('errror al registrar', 'error')
  }
}

}




