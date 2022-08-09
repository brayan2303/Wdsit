import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { PqrMasterEntity } from 'src/app/appPqrs/entities/pqrMaster.entity';
import { PqrMasterService } from 'src/app/appPqrs/services/pqrMaster.service';
import { GenCenterCostService } from 'src/app/appGeneral/services/genCenterCost.service';
import { PqrPqrsEntity } from 'src/app/appPqrs/entities/pqrPqrs.entity';
import { PqrTracingService } from 'src/app/appPqrs/services/pqrTracing.service';
import { PqrStatusService } from 'src/app/appPqrs/services/pqrStatus.service';
import { PqrRegionalService } from 'src/app/appPqrs/services/pqrRegional.service';
import * as moment from 'moment';
import { PqrMailService } from 'src/app/appPqrs/services/pqrMail.service';
import { PqrPqrsFileModel } from 'src/app/appPqrs/models/pqrPqrsFile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { PqrAgentService } from 'src/app/appPqrs/services/pqrAgent.service';
import { PqrAgentEntity } from 'src/app/appPqrs/entities/pqrAgent.entity';
import { GenCountryEntity } from "src/app/appGeneral/entities/genCountry.entity";
import { GenDepartmentEntity } from "src/app/appGeneral/entities/genDepartment.entity";
import { GenCityEntity } from "src/app/appGeneral/entities/genCity.entity";
import { GenCountryService } from "src/app/appGeneral/services/genCountry.service";
import { GenDepartmentService } from "src/app/appGeneral/services/genDepartment.service";
import { GenCityService } from "src/app/appGeneral/services/genCity.service";
import { DetailWMSModal } from "src/app/appPqrs/modals/detailWMS/detailWms.modal";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-pqrPqrsNew',
    templateUrl: './pqrPqrsNew.component.html',
    styleUrls: ['./pqrPqrsNew.component.css']
})
export class PqrPqrsNewComponent implements OnInit {
    @Input() pqrsId: number;
    @Output() closeDialog = new EventEmitter<any>();
    isRelative: boolean;
    title: string;
    agentId: number;
    agent: GenPersonEntity;
    statusId: number;
    statusAssignedId: number;
    genPersonEntity: GenPersonEntity;
    pqrPqrsEntity: PqrPqrsEntity;
    creationHour: number;
    creationMinute: number;
    customerTypeList: PqrMasterEntity[];
    proyectList: PqrMasterEntity[];
    regionalList: PqrMasterEntity[];
    tradeMarkList: PqrMasterEntity[];
    contactMethodList: PqrMasterEntity[];
    areaList: GenCustomerEntity[];
    categoryList: PqrMasterEntity[];
    countryList: GenCountryEntity[];
    departmentList: GenDepartmentEntity[];
    cityList: GenCityEntity[];
    contactEmailList: PqrMasterEntity[];
    typeList: PqrMasterEntity[];
    fileList: File[];
    pqrPqrsFileModel: PqrPqrsFileModel[];
    countryIdLocal:string;
    form = new FormGroup({
        id: new FormControl(0),
        ticket: new FormControl(0, Validators.required),
        creationDate: new FormControl(''),
        customerTypeId: new FormControl(0, Validators.required),
        proyectId: new FormControl(0, Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        countryId: new FormControl(0, Validators.required),
        departmentId: new FormControl(0, Validators.required),
        cityId: new FormControl(0, Validators.required),
        regionalId: new FormControl(0, Validators.required),
        serial: new FormControl('', Validators.required),
        typeId: new FormControl(0, Validators.required),
        tradeMarkId: new FormControl(0, Validators.required),
        contactMethodId: new FormControl(0),
        contactEmailId: new FormControl(0),
        responsibleAreaId: new FormControl(0, Validators.required),
        categoryId: new FormControl(0, Validators.required),
        equipmentQuantity: new FormControl(0, Validators.required),
        summary: new FormControl(''),
        statusId: new FormControl(0),
        entryNumber: new FormControl(0),
        levelNumber: new FormControl(0),
        creationPersonId: new FormControl(0)
    });
    agentList: PqrAgentEntity[];

    constructor(private dialog: MatDialog,private pqrPqrsS: PqrPqrsService, private pqrTracingS: PqrTracingService, private pqrStatusS: PqrStatusService, private pqrMasterS: PqrMasterService, private genCenterCostS: GenCenterCostService, private genCountryS: GenCountryService, private genDepartmentS: GenDepartmentService, private genCityS: GenCityService, private pqrRegionalS: PqrRegionalService, private pqrMailS: PqrMailService, private genPersonS: GenPersonService, private pqrAgentS: PqrAgentService, private alertS: AlertService) {
        this.isRelative=true;
        this.agentId = 0;
        this.pqrsId = 0;
        this.statusId = 0;
        this.statusAssignedId = 0;
        this.creationHour = 0;
        this.creationMinute = 0;
        this.customerTypeList = [];
        this.proyectList = [];
        this.regionalList = [];
        this.tradeMarkList = [];
        this.contactMethodList = [];
        this.areaList = [];
        this.categoryList = [];
        this.countryList = [];
        this.departmentList = [];
        this.cityList = [];
        this.contactEmailList = [];
        this.typeList = [];
        this.fileList = [];
        this.pqrPqrsFileModel = [];
        this.agentList = [];
        this.countryIdLocal = '';
    }
    ngOnInit() {
        this.countryIdLocal=localStorage.getItem('countryId');
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
        this.pqrStatusS.findId('Creada').subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.statusId = res.object;
                } else {
                    this.alertS.open('Error al encontrar el estado!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrStatusS.findId('Asignada').subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.statusAssignedId = res.object;
                }
                else {
                    this.alertS.open('Error al encontrar el estado!', 'error');
                }
            }
            else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrAgentS.list(Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.agentList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('TIPOS CLIENTE', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.customerTypeList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('PROYECTOS', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.proyectList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('MARCAS', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.tradeMarkList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('METODOS CONTACTO', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.contactMethodList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('CORREOS CONTACTO', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.contactEmailList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.genCenterCostS.findAll().subscribe(res => {
            if (res.message === 'OK') {
                this.areaList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('CATEGORIAS', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.categoryList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('TIPOS PQRS', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.typeList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.genCountryS.listActive().subscribe(res => {
            if (res.message === 'OK') {
                this.countryList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        if (this.pqrsId != 0) {
            this.title = 'Editar PQRS';
            this.pqrPqrsS.findById(this.pqrsId).subscribe(res => {
                if (res.message === 'OK') {
                    this.pqrPqrsEntity = res.object;
                    this.creationHour = Number(this.pqrPqrsEntity.creationDate.substring(11, 13));
                    this.creationMinute = Number(this.pqrPqrsEntity.creationDate.substring(14, 16));
                    console.log(this.pqrPqrsEntity.summary)
                 if(this.pqrPqrsEntity.summary == '' ||this.pqrPqrsEntity.summary == null ){                  
                    this.form.setValue({
                        'id': this.pqrPqrsEntity.id,
                        'ticket': this.pqrPqrsEntity.ticket,
                        'creationDate': this.pqrPqrsEntity.creationDate,
                        'customerTypeId': this.pqrPqrsEntity.customerTypeId,
                        'proyectId': this.pqrPqrsEntity.proyectId,
                        'firstName': this.pqrPqrsEntity.firstName,
                        'lastName': this.pqrPqrsEntity.lastName,
                        'countryId': this.pqrPqrsEntity.countryId,
                        'departmentId': this.pqrPqrsEntity.departmentId,
                        'cityId': this.pqrPqrsEntity.cityId,
                        'regionalId': this.pqrPqrsEntity.regionalId,
                        'serial': this.pqrPqrsEntity.serial,
                        'typeId': this.pqrPqrsEntity.typeId,
                        'tradeMarkId': this.pqrPqrsEntity.tradeMarkId,
                        'contactMethodId': this.pqrPqrsEntity.contactMethodId,
                        'contactEmailId': this.pqrPqrsEntity.contactEmailId,
                        'responsibleAreaId': this.pqrPqrsEntity.responsibleAreaId,
                        'categoryId': this.pqrPqrsEntity.categoryId,
                        'equipmentQuantity': this.pqrPqrsEntity.equipmentQuantity,
                        'summary': this.pqrPqrsEntity.summaryAlternative,
                        'entryNumber': this.pqrPqrsEntity.entryNumber,
                        'levelNumber': this.pqrPqrsEntity.levelNumber,
                        'statusId': this.pqrPqrsEntity.statusId,
                        'creationPersonId': this.pqrPqrsEntity.creationPersonId
                    });
                }else{
                    this.form.setValue({
                        'id': this.pqrPqrsEntity.id,
                        'ticket': this.pqrPqrsEntity.ticket,
                        'creationDate': this.pqrPqrsEntity.creationDate,
                        'customerTypeId': this.pqrPqrsEntity.customerTypeId,
                        'proyectId': this.pqrPqrsEntity.proyectId,
                        'firstName': this.pqrPqrsEntity.firstName,
                        'lastName': this.pqrPqrsEntity.lastName,
                        'countryId': this.pqrPqrsEntity.countryId,
                        'departmentId': this.pqrPqrsEntity.departmentId,
                        'cityId': this.pqrPqrsEntity.cityId,
                        'regionalId': this.pqrPqrsEntity.regionalId,
                        'serial': this.pqrPqrsEntity.serial,
                        'typeId': this.pqrPqrsEntity.typeId,
                        'tradeMarkId': this.pqrPqrsEntity.tradeMarkId,
                        'contactMethodId': this.pqrPqrsEntity.contactMethodId,
                        'contactEmailId': this.pqrPqrsEntity.contactEmailId,
                        'responsibleAreaId': this.pqrPqrsEntity.responsibleAreaId,
                        'categoryId': this.pqrPqrsEntity.categoryId,
                        'equipmentQuantity': this.pqrPqrsEntity.equipmentQuantity,
                        'summary': this.pqrPqrsEntity.summary,
                        'entryNumber': this.pqrPqrsEntity.entryNumber,
                        'levelNumber': this.pqrPqrsEntity.levelNumber,
                        'statusId': this.pqrPqrsEntity.statusId,
                        'creationPersonId': this.pqrPqrsEntity.creationPersonId
                    });

                }
                    this.selectCountry();
                    this.selectDepartment();
                    this.selectCity();
                    this.pqrPqrsS.listFile(this.pqrPqrsEntity.number, 'INICIO').subscribe(resL => {
                        if (resL.message === 'OK') {
                            this.pqrPqrsFileModel = resL.object;
                        } else {
                            this.alertS.open(resL.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.title = 'Nueva PQRS';
        }
    }
    selectAgent() {
        if (this.agentId != 0) {
            this.genPersonS.findById(this.agentId).subscribe(res => {
                if (res.message === 'OK') {
                    this.agent = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    save() {
        this.form.controls.creationDate.setValue(moment(this.form.controls.creationDate.value).format('YYYY-MM-DD') + ' ' + this.creationHour + ':' + this.creationMinute + ':00.000');
        this.form.controls.statusId.setValue(this.statusId);
        this.form.controls.creationPersonId.setValue(this.genPersonEntity.id);
        if (this.pqrsId === 0) {
            this.pqrPqrsS.create(this.form.value, Number(this.countryIdLocal)).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != null) {
                        this.pqrTracingS.create(resC.object.toString().split('|', 2)[1], this.form.controls.ticket.value, this.form.controls.typeId.value, 'Estado', this.statusId, 'Pqrs Creada', this.genPersonEntity.id).subscribe(resT => {
                            if (resT.message === 'OK') {
                                if (resT.object != 0) {
                                    if (this.fileList.length > 0) {
                                        this.loadFile(resC.object.toString().split('|', 2)[1]);
                                    }
                                    var variables: string[] = [];
                                    variables.push(resC.object.toString().split('|', 2)[1]);
                                    variables.push('Creada');
                                    variables.push(this.form.controls.creationDate.value);
                                    variables.push(this.genPersonEntity.firstName + ' ' + this.genPersonEntity.lastName);
                                    this.pqrMailS.send(this.statusId, variables).subscribe(resM => {
                                        if (resM.message != 'OK') {
                                            this.alertS.open(resM.message, 'error');
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                    });
                                } else {
                                    this.alertS.open('Error al insertar el movimiento!', 'error');
                                }
                            } else {
                                this.alertS.open(resT.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                        if (this.agentId != 0) {
                            this.pqrPqrsS.manage(resC.object.toString().split('|', 2)[0], this.agentId, this.statusAssignedId, 'Asignar').subscribe(resA => {
                                if (resA.message === 'OK') {
                                    if (resA.object != 0) {
                                        this.pqrTracingS.create(resC.object.toString().split('|', 2)[1], this.form.controls.ticket.value, this.form.controls.typeId.value, 'Estado', this.statusAssignedId, 'Pqrs Asignada a: ' + this.agent.firstName + ' ' + this.agent.lastName, this.genPersonEntity.id).subscribe(resT => {
                                            if (resT.message === 'OK') {
                                                if (resT.object != 0) {
                                                    this.alertS.open('PQRS creada y asignada, ticket asignado: ' + resC.object.toString().split('|', 2)[1], 'success');
                                                    this.form.setValue({
                                                        'id': 0,
                                                        'ticket': 0,
                                                        'creationDate': '',
                                                        'customerTypeId': 0,
                                                        'proyectId': 0,
                                                        'firstName': '',
                                                        'lastName': '',
                                                        'countryId': 0,
                                                        'departmentId': 0,
                                                        'cityId': 0,
                                                        'regionalId': 0,
                                                        'serial': '',
                                                        'typeId': 0,
                                                        'tradeMarkId': 0,
                                                        'contactMethodId': 0,
                                                        'contactEmailId': 0,
                                                        'responsibleAreaId': 0,
                                                        'categoryId': 0,
                                                        'equipmentQuantity': 0,
                                                        'summary': '',
                                                        'entryNumber': 0,
                                                        'levelNumber': 0,
                                                        'statusId': 0,
                                                        'creationPersonId': 0
                                                    });
                                                    this.agentId = 0;
                                                }
                                                else {
                                                    this.alertS.open('Error al insertar el movimiento!', 'error');
                                                }
                                            }
                                            else {
                                                this.alertS.open(resT.message, 'error');
                                            }
                                        }, err => {
                                            this.alertS.open(err.message, 'error');
                                        });
                                    }
                                    else {
                                        this.alertS.open('Error al asignar la PQRS!', 'error');
                                    }
                                }
                                else {
                                    this.alertS.open(resA.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('PQRS creada, ticket asignado: ' + resC.object.toString().split('|', 2)[1], 'success');
                            this.form.setValue({
                                'id': 0,
                                'ticket': 0,
                                'creationDate': '',
                                'customerTypeId': 0,
                                'proyectId': 0,
                                'firstName': '',
                                'lastName': '',
                                'countryId': 0,
                                'departmentId': 0,
                                'cityId': 0,
                                'regionalId': 0,
                                'serial': '',
                                'typeId': 0,
                                'tradeMarkId': 0,
                                'contactMethodId': 0,
                                'contactEmailId': 0,
                                'responsibleAreaId': 0,
                                'categoryId': 0,
                                'equipmentQuantity': 0,
                                'summary': '',
                                'entryNumber': 0,
                                'levelNumber': 0,
                                'statusId': 0,
                                'creationPersonId': 0
                            });
                            this.agentId = 0;
                        }
                    } else {
                        this.alertS.open('Error al guardar la PQRS!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.pqrPqrsS.update(this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('PQRS actualizada!', 'success');
                        this.form.setValue({
                            'id': 0,
                            'ticket': 0,
                            'creationDate': '',
                            'customerTypeId': 0,
                            'proyectId': 0,
                            'firstName': '',
                            'lastName': '',
                            'countryId': 0,
                            'departmentId': 0,
                            'cityId': 0,
                            'regionalId': 0,
                            'serial': '',
                            'typeId': 0,
                            'tradeMarkId': 0,
                            'contactMethodId': 0,
                            'contactEmailId': 0,
                            'responsibleAreaId': 0,
                            'categoryId': 0,
                            'equipmentQuantity': 0,
                            'summary': '',
                            'entryNumber': 0,
                            'levelNumber': 0,
                            'statusId': 0,
                            'creationPersonId': 0
                        });
                        this.agentId = 0;
                        this.closeDialog.emit();
                    } else {
                        this.alertS.open('Error al actualizar la PQRS!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    selectCountry() {
        this.genDepartmentS.listActive(this.form.controls.countryId.value).subscribe(res => {
            if (res.message === 'OK') {
                this.departmentList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    selectDepartment() {
        this.genCityS.listActive(this.form.controls.departmentId.value).subscribe(res => {
            if (res.message === 'OK') {
                this.cityList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    selectCity() {
        this.pqrRegionalS.findAll(this.form.controls.cityId.value,Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.regionalList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    addFile(file: FileList) {
        if (file != undefined) {
            for (let i = 0; i < file.length; i++) {
                this.fileList.push(file[i]);
            }
        }
    }
    removeFile(i: number) {
        this.fileList.splice(i, 1);
    }
    loadFile(number: string) {
        this.pqrPqrsS.loadFile(number, 'INICIO', this.fileList).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.fileList = [];
                } else {
                    this.alertS.open('Error al cargar el archivo!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    downloadFile(file: PqrPqrsFileModel) {
        var downloadLink = document.createElement("a");
        if (file.type === 'imagen') {
            downloadLink.setAttribute("href", "data:image/png;base64," + file.file);
        } else {
            var binary = window.atob(file.file);
            var binaryLength = binary.length;
            var bytes = new Uint8Array(binaryLength);
            for (var i = 0; i < binaryLength; i++) {
                var ascii = binary.charCodeAt(i);
                bytes[i] = ascii;
            }
            var blob = new Blob([bytes], { type: "application/" + file.name.split('.', 2)[1] });
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    detail(detail: string) {
        this.dialog.open(DetailWMSModal, {
            width: '100%',
            data: { detail: detail }
        });
    }

}
