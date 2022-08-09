import { Component } from "@angular/core";
import { PqrPqrsEntity } from 'src/app/appPqrs/entities/pqrPqrs.entity';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrTracingEntity } from 'src/app/appPqrs/entities/pqrTracing.entity';
import { PqrTracingService } from 'src/app/appPqrs/services/pqrTracing.service';
import { MatDialog } from "@angular/material/dialog";
import { PqrFormLawModal } from "src/app/appPqrs/modals/pqrFormLaw/PqrFormLaw.modal";
import { PqrFormLawListeModal } from "src/app/appPqrs/modals/pqrFormLawList/pqrFormLawList.modal";
import { PqrPageClientInitNewModal } from "src/app/appPqrs/modals/pqrPageClientInit/pqrPageClientInitNew/pqrPageClientInitNew.modal";
import { PqrPageClientInitListModal } from "src/app/appPqrs/modals/pqrPageClientInit/pqrPageClientInitList/pqrPageClientInitList.modal";
import { PqrFormTableNewModal } from "src/app/appPqrs/modals/PqrFormTable/pqrFormTableNew/pqrFormTableNew.modal";
import { PqrFormTableListModal } from "src/app/appPqrs/modals/PqrFormTable/pqrFormTableList/pqrFormTableList.modal";
import { PqrFormModalNewModal } from "src/app/appPqrs/modals/pqrFormModal/pqrFormModalNew/pqrFormModalNew.modal";
import { PqrFormModalListModal } from "src/app/appPqrs/modals/pqrFormModal/pqrFormModalList/pqrFormModalList.modal";

@Component({
    selector: 'app-pqrListAllForm',
    templateUrl: './pqrListAllForm.component.html',
    styleUrls: ['./pqrListAllForm.component.css']
})
export class PqrListAllFormComponent {
    loadingPqrs:boolean;
    loadingTracing:boolean;
    searchType: string;
    searchData: string;
    pqrsList: PqrPqrsEntity[];
    tracingList: PqrTracingEntity[];
    pqrPqrsEntity:PqrPqrsEntity;
    id:number;

    constructor(private pqrPqrsS: PqrPqrsService,private dialog: MatDialog, private pqrTracingS: PqrTracingService, private alertS: AlertService) {
        this.loadingPqrs=false;
        this.loadingTracing=false;
        this.searchType = '';
        this.pqrsList = [];
        this.tracingList = [];
        this.id = 0;
    }

    registerOne() {
        this.dialog.open(PqrFormLawModal, {
            width: '100%',
            data: {formId:this.id}
         }).afterClosed().subscribe(res=>{
        })
     }

     registerOneList() {
        this.dialog.open(PqrFormLawListeModal, {
            width: '100%',
            data: {formId:this.id}
         }).afterClosed().subscribe(res=>{
        })
     }
     registerTwo() {
        this.dialog.open(PqrPageClientInitNewModal, {
            width: '100%',
            data: {formId:this.id}
         }).afterClosed().subscribe(res=>{
        })
     }

     registerTwoList() {
        this.dialog.open(PqrPageClientInitListModal, {
            width: '100%',
            data: {formId:this.id}
         }).afterClosed().subscribe(res=>{
        })
     }
     registerTheer() {
      this.dialog.open(PqrFormTableNewModal, {
          width: '100%',
          data: {formId:this.id}
       }).afterClosed().subscribe(res=>{
      })
   }

   registerTheerList() {
      this.dialog.open(PqrFormTableListModal, {
          width: '100%',
          data: {formId:this.id}
       }).afterClosed().subscribe(res=>{
      })
   }
   registerFour() {
      this.dialog.open(PqrFormModalNewModal, {
          width: '100%',
          data: {formId:this.id}
       }).afterClosed().subscribe(res=>{
      })
   }

   registerFourList() {
      this.dialog.open(PqrFormModalListModal, {
          width: '100%',
          data: {formId:this.id}
       }).afterClosed().subscribe(res=>{
      })
   }


   
}