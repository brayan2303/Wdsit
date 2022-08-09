import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { InvCyclicEntity } from 'src/app/appInventory/entities/invCyclic.entity';
import { InvCyclicService } from 'src/app/appInventory/services/invCyclic.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";

@Component({
    selector: 'app-invCyclicNew',
    templateUrl: './invCyclicNew.component.html',
    styleUrls: ['./invCyclicNew.component.css']
})
export class InvCyclicNewComponent implements OnInit {
    title: string;
    @Input() cyclicId: number;
    @Output() closeDialog = new EventEmitter<any>();
    genPersonEntity: GenPersonEntity;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        typeSampling: new FormControl('', Validators.required),
        sampling: new FormControl('', Validators.required),
        system: new FormControl('', Validators.required),
        crossSap: new FormControl(''),
        crossWms: new FormControl(''),
        crossBase: new FormControl(''),
        principalSystem: new FormControl(''),
        countryId: new FormControl(''),
        customerId: new FormControl('', Validators.required),
        personId: new FormControl(''),
        active: new FormControl('')
    });
    customerList: GenCustomerEntity[];
    invCyclicEntity: InvCyclicEntity;
    systemList: string[];

    constructor(private invCyclicS: InvCyclicService, private genCountryCustomerS: GenCountryCustomerService, private alertS: AlertService) {
        this.cyclicId = 0;
        this.customerList = [];
        this.systemList = [];
    }
    ngOnInit(): void {
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
        if (this.cyclicId != 0) {
            this.title = 'Editar Ciclico';
            this.invCyclicS.findById(this.cyclicId).subscribe(res => {
                if (res.message === 'OK') {
                    this.invCyclicEntity = res.object;
                    if(this.invCyclicEntity.crossSap){
                        this.systemList.push('SAP');
                    }
                    if(this.invCyclicEntity.crossWms){
                        this.systemList.push('WMS');
                    }
                    if(this.invCyclicEntity.crossBase){
                        this.systemList.push('BASE');
                    }
                    this.form.setValue(
                        {
                            'id': this.invCyclicEntity.id,
                            'name': this.invCyclicEntity.name,
                            'typeSampling': this.invCyclicEntity.typeSampling,
                            'sampling': this.invCyclicEntity.sampling,
                            'system':this.invCyclicEntity.system,
                            'crossSap': this.invCyclicEntity.crossSap,
                            'crossWms': this.invCyclicEntity.crossWms,
                            'crossBase': this.invCyclicEntity.crossBase,
                            'principalSystem': this.invCyclicEntity.principalSystem,
                            'countryId':this.invCyclicEntity.countryId,
                            'customerId': this.invCyclicEntity.customerId,
                            'personId': this.invCyclicEntity.personId,
                            'active': this.invCyclicEntity.active
                        }
                    );
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.title = 'Nuevo Ciclico';
        }
        this.genCountryCustomerS.listCustomer(Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.customerList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    onClick() {
        var system = true;
        if (this.systemList.length > 0) {
            if (this.form.controls.principalSystem.value === '') {
                system = false;
            }
        }
        if (system) {
            this.form.controls.countryId.setValue(Number(localStorage.getItem('countryId')));
            this.form.controls.personId.setValue(this.genPersonEntity.id);
            if (this.cyclicId === 0) {
                this.invCyclicS.create(this.form.value).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Ciclico creado!', 'success');
                            this.form.setValue(
                                {
                                    'id': '',
                                    'name': '',
                                    'typeSampling': '',
                                    'sampling': '',
                                    'system':'',
                                    'crossSap': '',
                                    'crossWms': '',
                                    'crossBase': '',
                                    'principalSystem': '',
                                    'countryId':'',
                                    'customerId': '',
                                    'personId': '',
                                    'active': ''
                                }
                            );
                            this.cyclicId = 0;
                        } else {
                            this.alertS.open('Error al crear el ciclico!', 'error');
                        }
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.invCyclicS.update(this.form.value).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Ciclico actualizado!', 'success');
                            this.form.setValue(
                                {
                                    'id': '',
                                    'name': '',
                                    'typeSampling': '',
                                    'sampling': '',
                                    'system':'',
                                    'crossSap': '',
                                    'crossWms': '',
                                    'crossBase': '',
                                    'principalSystem': '',
                                    'countryId':'',
                                    'customerId': '',
                                    'personId': '',
                                    'active': ''
                                }
                            );
                            this.cyclicId = 0;
                        } else {
                            this.alertS.open('Error al actualizar el ciclico!', 'error');
                        }
                    } else {
                        this.alertS.open(resU.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            this.alertS.open('Seleccione un sistema principal!', 'warning');
        }
    }
    addSystem(input: HTMLInputElement, system: string) {
        if (input.checked) {
            this.systemList.push(system);
        } else {
            for (let s of this.systemList) {
                if (s === system) {
                    this.systemList.splice(this.systemList.indexOf(system), 1);
                    break;
                }
            }
        }
    }
}