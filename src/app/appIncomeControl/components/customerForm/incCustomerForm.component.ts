import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-incCustomerForm',
  templateUrl: './incCustomerForm.component.html',
  styleUrls: ['./incCustomerForm.component.css']
})
export class IncCustomerFormComponent implements OnInit{
  @Output()customerEmit=new EventEmitter();
  @Input()isData:boolean;
  customerList: GenCustomerEntity[];

  constructor(private genCustomerS:GenCustomerService,private alertS:AlertService) {}

  ngOnInit() {
    this.genCustomerS.findByIncomeActive().subscribe(res=>{
      if(res.message==='OK'){
        this.customerList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
        this.alertS.open(err.message,'error');
    });
  }
  onClick(input: HTMLInputElement) {
    if (input.tagName === 'SPAN') {
      let parent = input.parentNode as HTMLInputElement;
      this.customerEmit.emit(parseInt(parent.value));
    } else {
      this.customerEmit.emit(parseInt(input.value));
    }
  }
}
