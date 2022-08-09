import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { InvMasterInitTigoEntity } from 'src/app/appInventory/entities/invMasterInitTigo.entity';
import { InvMasterInitTigoService } from 'src/app/appInventory/services/invMasterInitTigo.service';
import { InvPersonAllModal } from 'src/app/appInventory/modals/invPersonAll/invPersonAll.modal';

@Component({
    selector: 'app-invChangePalletTigo',
    templateUrl: './invChangePalletTigo.component.html',
    styleUrls: ['./invChangePalletTigo.component.css']
})
export class InvChangePalletTigoComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    palletList: InvMasterInitTigoEntity[];
    genPersonEntity: GenPersonEntity;
    location: string;
    validation: boolean;
    userId: number;

    constructor(private dialog: MatDialog, private alertS: AlertService, private InvMasterInitTigoS: InvMasterInitTigoService) {
        this.loading = false;
        this.columns = ['pallet', 'codigoSap', 'location', 'typology', 'creationDate', 'userCreation', 'userUpdate', 'status', 'active', 'Acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.location = '';
        this.palletList = [];
        this.userId = 0;
    }

    ngOnInit(): void {
        this.list();
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    }

    list() {
        this.InvMasterInitTigoS.listAll().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource<any>(res.object);
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

    getUpdatePerdon(palletId:number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿ Desea asignar el conteo a otro usuario ?' },
            height: '250px',
            width: '400px'
          }).afterClosed().subscribe(resM => {
            if (resM) {
                this.dialog.open(InvPersonAllModal, {
                    width: '100%'
                }).afterClosed().subscribe(res => {
                    if (res['id'] != '') {
                        this.userId = res['id'];
                    }
                    this.InvMasterInitTigoS.updatePerson(palletId,this.userId,this.genPersonEntity.id).subscribe(resP =>{
                        if(resP.message === 'OK'){
                            if(resP.object !=0){
                                this.alertS.open('Usuario asignado','success');
                                this.list();
                            }else{
                                this.alertS.open(resP.message, 'error');
                            }
                        }else{
                            this.alertS.open(resP.message, 'error');
                        }
                    })
                    
        
                },err =>{
                    this.alertS.open(err.message, 'error');
                })
            }
          })

    }






}