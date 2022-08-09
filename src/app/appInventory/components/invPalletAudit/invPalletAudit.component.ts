import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvMasterInitService } from '../../services/invMasterInit.service';
import { InvMasterInitEntity } from '../../entities/invMasterInit.entity';
import { MatSort } from '@angular/material/sort';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { ComCommodityPalletModel } from 'src/app/appComodityEntry/models/comCommodityPalletModel';
import { invSerialDetailComponent } from '../../modals/invSerialDetail/invSerialDetail.component';
import { InvMasterTypeModal } from '../../modals/invMasterType/invMasterType.modal';

@Component({
    selector: 'app-invPalletAudit',
    templateUrl: './invPalletAudit.component.html',
    styleUrls: ['./invPalletAudit.component.css']
})
export class invPalletAuditComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    palletList: InvMasterInitEntity[];
    genPersonEntity: GenPersonEntity;
    location: string;
    validation: boolean;

    constructor(private dialog: MatDialog, private alertS: AlertService, private InvMasterInitS: InvMasterInitService) {
        this.loading = false;
        this.columns = ['Pallet', 'CodigoSap', 'Location', 'Typology', 'State', 'Actions'];
        this.dataSource = new MatTableDataSource([]);
        this.location = '';
        this.palletList = [];
    }

    ngOnInit(): void {
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
        this.list();
    }

    list() {
        this.InvMasterInitS.listByAudit().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource<any>(res.object);
                console.log(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    changeState(id: number, state: string) {
        if(state == 'Aprobado'){
            this.dialog.open(InvMasterTypeModal, {
                width: '100%',
                data: { type: 'UBICACION' }
            }).afterClosed().subscribe(res => {
                if (res['code'] != '') {
                    this.location = res['code'];
                }if(this.location != ''){
                this.InvMasterInitS.updateLocation(id, this.location).subscribe(resU => {
                    
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Localizacion registrada', 'succes');
                            this.validation = true;
    
                            if (this.validation == true) {
                                this.dialog.open(ConfirmationComponent, {
                                    data: { message: 'Desea cambiar el estado por ' + state + '?' },
                                    height: '250px',
                                    width: '400px'
                                }).afterClosed().subscribe(res => {
                                    if (res) {
                                        this.InvMasterInitS.changeState(id, state, this.genPersonEntity.id).subscribe(res => {
                                            if (res.message === 'OK') {
                                                this.alertS.open('Pallet Aprobado con exito!', 'success');
                                                if (state == 'Aprobado') {
                                                    this.alertS.open('Generando Pallet!', 'success');
                                                    this.generatePallet(id + '');
                                                }
                                                this.list();
                                            } else {
                                                this.alertS.open(res.message, 'error');
                                            }
                                        }, err => {
                                            this.alertS.open(err.message, 'error');
                                        });
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            }
                        } else {
                            this.alertS.open(resU.message, 'error');
                        }
                    } else {
                        this.alertS.open(resU.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                
                
                })
            }else{
                this.alertS.open('Por favor seleccione una ubicacion','warning')
            }
            })

        }else if(state == 'Rechazado'){
            this.dialog.open(ConfirmationComponent, {
                data: { message: 'Desea cambiar el estado por ' + state + '?' },
                height: '250px',
                width: '400px'
            }).afterClosed().subscribe(res => {
                if (res) {
                    this.InvMasterInitS.changeState(id, state, this.genPersonEntity.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.alertS.open('Pallet Rechazado con exito!', 'success');
                            this.list();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
        


    }

    searchDetail(palletId: number) {

        this.dialog.open(invSerialDetailComponent, {
            data: {
                id: palletId
            },
            width: '100%'
        }).afterClosed().subscribe(resA => { });
    }

    generatePallet(palletId: string) {
        //Busqueda del certificado
        this.InvMasterInitS.generatePallet(palletId).subscribe(res => {
            if (res.message === 'OK') {
                //Descarga de lo obtenido.
                this.downloadFile(res.object);
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }


    getLocation(id: number) {
        this.dialog.open(InvMasterTypeModal, {
            width: '100%',
            data: { type: 'UBICACION' }
        }).afterClosed().subscribe(res => {
            if (res['code'] != '') {
                this.location = res['code'];
            }
            this.InvMasterInitS.updateLocation(id, this.location).subscribe(resU => {
                if (resU.message === 'OK') {
                    if (resU.object != 0) {
                        this.alertS.open('Localizacion registrada', 'error');
                        this.validation = true;
                    } else {
                        this.alertS.open(resU.message, 'error');
                    }
                } else {
                    this.alertS.open(resU.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            })
        })
    }

    //Descargar el documento obtenido
    downloadFile(file: ComCommodityPalletModel) {
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