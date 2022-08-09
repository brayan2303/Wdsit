import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MasMailEntity } from "src/app/appMassiveMail/entities/masMail.entity";
import { MasMailService } from "src/app/appMassiveMail/services/masMail.service";
import { MasSendService } from "src/app/appMassiveMail/services/masSend.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: 'app-masSend',
    templateUrl: './masSend.component.html',
    styleUrls: ['./masSend.component.css']
})
export class MasSendComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    person:GenPersonEntity;
    mailList:MasMailEntity[];
    mailId:number;

    constructor(private masMailS:MasMailService,private masSendS: MasSendService, private alertS: AlertService, private dialog: MatDialog) {
        this.loading = false;
        this.columns = ['mail', 'message', 'creationDate', 'creationUser','approvalDate','approvalUser','sendingDate','sendingUser', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.mailList=[];
        this.mailId=0;
    }
    ngOnInit(): void {
        this.person = JSON.parse(localStorage.getItem('user'));
        this.masMailS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.mailList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getSend(){
        this.loading=true;
        this.masSendS.list(this.mailId,this.person.id).subscribe(res=>{
            if(res.message==='OK'){
                this.dataSource=new MatTableDataSource(res.object);
                this.dataSource.paginator=this.paginator;
                this.loading=false;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    approveReject(id:number,message:string){
        this.masSendS.approveReject(id,message).subscribe(resA=>{
            if(resA.message==='OK'){
                if(resA.object!=0){
                    this.alertS.open(message==='Aprobado'?'Envio aprobado!':'Envio rechazado!','success');
                    this.getSend();
                }else{
                    this.alertS.open(message==='Aprobado'?'Error al aprobar el envio!':'Error al rechazar el envio!','error');
                }
            }else{
                this.alertS.open(resA.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    detail(mailId:number){
        this.masMailS.findById(mailId).subscribe(res=>{
            if(res.message==='OK'){
                document.getElementById('message').innerHTML=res.object['message'];
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
}