import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DocumentLoadEntity } from "src/app/appDocuments/entities/DocumentLoadEntity";
import { DocumentTypeEntity } from "src/app/appDocuments/entities/DocumentTypeEntity";
import { documentFileModel } from "src/app/appDocuments/models/documentFile.model";
import { documentTypeModel } from "src/app/appDocuments/models/documentType.model";
import { DocumentLoadService } from "src/app/appDocuments/services/DocumentLoad.Service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { GenPersonService } from "src/app/appGeneral/services/genPerson.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: 'app-documentLoad',
    templateUrl: './documentLoad.component.html',
    styleUrls: ['./documentLoad.component.css']
})

export class DocumentLoadComponent implements OnInit {
    public loading: boolean;
    @Input() docLoadformId: number;
    @Output() closeDialog = new EventEmitter<any>();
    tittle: string;
    form: FormGroup;
    TypeList: documentTypeModel[];
    genPersonE: GenPersonEntity;
    genPersonL: GenPersonEntity;
    DocumentLoadE: DocumentLoadEntity;
    searchDocumentId: number;
    DocumentTypeE: DocumentTypeEntity;
    documentId: number;
    userPropertyId: number;
    documentPropertyIdentification: number;
    fileList: File[];
    validate: number;
    documentFile: documentFileModel[];


    constructor(private fb: FormBuilder, private alertS: AlertService, private DocumentLoadS: DocumentLoadService, private genPersonS: GenPersonService, private documentLoadDS: DocumentLoadService) {
        this.docLoadformId = 0;
        this.TypeList = [];
        this.DocumentLoadE = new DocumentLoadEntity();
        this.DocumentTypeE = new DocumentTypeEntity();
        this.searchDocumentId = 0;
        this.documentId = 0;
        this.userPropertyId = 0;
        this.genPersonL = new GenPersonEntity();
        this.documentPropertyIdentification = 0;
        this.fileList = [];
        this.documentFile = [];
        this.validate = 0;
    }
    ngOnInit(): void {
        this.formBuilders();
        this.genPersonE = JSON.parse(localStorage.getItem('user'));
        this.listType();
        if (this.docLoadformId != 0) {
            // console.log("ENTRO A EDITAR");
            this.tittle = "Editar documento";
            this.findById();
        } else {
            this.tittle = "Cargar nuevo documento";
        }

    }
    //Carga variables para inicializar el formulario 
    formBuilders() {
        this.form = this.fb.group({
            nameUser: [, [Validators.required]],
            costCenter: [, []],
            identification: [, []],
            version: [, [Validators.required]],
            documentId: [, []],
            documentPropertyIdentification: [, []]
        });
    }
    //Función save
    save() {
        if(this.fileList.length == 1)
        {
            if (this.docLoadformId === 0) {
                this.form.markAllAsTouched();
                if (this.form.invalid) {
                    return;
                }
                this.DocumentLoadS.create(this.genPersonL.id, this.genPersonE.id, this.form.value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Registro creado!', 'success');
                            this.loadFile(res.object);

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
                this.DocumentLoadS.loadFile(this.docLoadformId, this.fileList).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.fileList = [];
                            this.alertS.open('Archivo cargado con exito!', 'success');
                            this.update(this.genPersonE.id, this.docLoadformId)
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
        }else{
            this.alertS.open('Recuerde que se debe cargar 1 solo archivo!', 'error');
            return;
        }
    }

    update(userId: number, id: number) {
        this.DocumentLoadS.update(userId, this.DocumentLoadE).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Registro actualizado!', 'success');
                    this.form.setValue(
                        {
                            'nameUser': '',
                            'costCenter': '',
                            'identification': '',
                            'documentPropertyIdentification': '',
                            'documentId': '',
                            'version': ''
                        }
                    );
                    this.closeDialog.emit();
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

    findById() {
        this.DocumentLoadS.findById(this.docLoadformId).subscribe(res => {
            if (res.message === 'OK') {
                this.DocumentLoadE = res.object;
                this.form.setValue(
                    {
                        'nameUser': this.DocumentLoadE.userPropertyName,
                        'costCenter': this.DocumentLoadE.costCenter,
                        'identification': this.DocumentLoadE.userPropertyIdentification,
                        'documentPropertyIdentification': this.DocumentLoadE.userPropertyIdentification,
                        'documentId': this.DocumentLoadE.documentName,
                        'version': this.DocumentLoadE.version
                    }
                );
                this.listFile();
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    listFile() {
        this.DocumentLoadS.listFile(this.DocumentLoadE.id).subscribe(res => {
            if (res.message === 'OK') {
                this.documentFile = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    // Función search
    search() {
        this.genPersonS.findByIdentification(this.documentPropertyIdentification).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != null) {
                    this.genPersonL = res.object;
                    this.form.get('nameUser').setValue(res.object.firstName + ' ' + res.object.lastName);
                    this.form.get('identification').setValue(res.object.identification);
                    this.form.get('costCenter').setValue(res.object.centerCost);
                    this.form.get('version').setValue(res.object.version);
                } else {
                    this.alertS.open(res.message, 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open('¡Por favor Ingrese un número de documento !', 'warning');
        });
    }

    listType() {
        this.DocumentLoadS.listType().subscribe(res => {
            if (res.message === 'OK') {
                this.TypeList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    /**
     * UserId = this.genPersonL.id
     * DocumentId = this.searchDocumentId
     */
    searchVersionDocument() {
        this.DocumentLoadS.findVersion(this.genPersonL.id, this.documentId).subscribe(res => {
            if (res.message === 'OK') {
                this.form.get('version').setValue(res.object);
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
                var x = this.fileList.length;
                this.validate = x;
                if (x >= 1) {
                    this.alertS.open('Solo se permite 1 archivo a la vez', 'warning');
                } else {
                    this.fileList.push(file[i]);
                }
            }
        }

    }
    loadFile(documentId: number) {
        this.DocumentLoadS.loadFile(documentId, this.fileList).subscribe(res => {
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

    removeFile(i: number) {
        this.fileList.splice(i, 1);
        this.documentFile.splice(i, 1);
    }

    download(file: documentFileModel) {
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
            var blob = new Blob([bytes], { type: "application/" + file.type });
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name + '.' + file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}


