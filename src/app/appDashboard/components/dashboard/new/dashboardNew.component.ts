import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { FamilyListModel } from "src/app/appDashboard/models/familyList.model";
import { FamilyListFModel } from "src/app/appDashboard/models/familyListF.model";
import { DashBoardClienteService } from "src/app/appDashboard/services/dashBoardClient.Service";
import { GenCustomerEntity } from "src/app/appGeneral/entities/genCustomer.entity";
import { GenPlantEntity } from "src/app/appGeneral/entities/genPlant.entity";
import { DataModel } from "src/app/appGeneral/models/data.model";
import { GenCountryCustomerService } from "src/app/appGeneral/services/genCountryCustomer.service";
import { GenPlantService } from "src/app/appGeneral/services/genPlant.service";
import { RepReportEntity } from "src/app/appReport/entities/repReport.entity";
import { BarChartOptionsModel } from "src/app/shared/models/barChartOptions.model";
import { AlertService } from "src/app/shared/services/alert.service";
import { ChartService } from "src/app/shared/services/chart.service";

@Component({
  selector: 'app-dashboardNew',
  templateUrl: './dashboardNew.component.html',
  styleUrls: ['./dashboardNew.component.css']
})
export class DashBoardNewComponent implements OnInit {
  customerId: number;
  customerList: GenCustomerEntity[];
  familyList: FamilyListModel[];
  familyListF: FamilyListFModel[];
  familyListC: FamilyListFModel[];
  plantList: GenPlantEntity[];
  repReportEntity: RepReportEntity;
  plantId: number;
  familia: string;
  data1: DataModel;
  @ViewChild('chart') chart: ChartComponent;
  public barChartOptions: Partial<BarChartOptionsModel>;
  validador: boolean;
  loading: boolean;

  constructor(private genplantS: GenPlantService, private dashBoardS: DashBoardClienteService, private genCountryCustomerS: GenCountryCustomerService, private alertS: AlertService, private chartS: ChartService) {
    this.customerId = 0;
    this.validador = false;
    this.customerList = [];
    this.familyList = [];
    this.familyListF = [];
    this.familyListC = [];
    this.repReportEntity = new RepReportEntity();
    this.plantList = [];
    this.plantId = 0;
    this.familia = '0';
    this.data1 = new DataModel();
    this.data1.dataX = [];
    this.data1.dataY = [];
    this.loading = false;


  }
  ngOnInit(): void {
    this.getPlant();
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

  search() {
    this.familyListF = [];
    this.loading = true;
    this.validador = false;
    this.dashBoardS.listFamily(this.plantId, this.customerId, this.familia, Number(localStorage.getItem('countryId'))).subscribe(resA => {
      if (resA.message === 'OK') {
        this.familyListF = resA.object;
        this.loading = false;
      } else {
        this.alertS.open(resA.message, 'error');
      }
    }
    );
  }
  getFamily(customerId: number) {
    this.familyList = [];
    this.dashBoardS.findByCustomerId(customerId,Number(localStorage.getItem('countryId'))).subscribe(res => {
      if (res.message === 'OK') {
        this.familyList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }
    );
  }
  getPlant() {
    this.genplantS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.plantList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  getFindfamily(customer: string, familia: string) {
    this.loading = true;
    this.familyListC = [];
    this.validador = false;
    this.dashBoardS.findByFamily(customer, familia, Number(localStorage.getItem('countryId'))).subscribe(res => {
      if (res.message === 'OK') {
        this.familyListC = res.object;
        this.loading = false;
        this.getReport();
      } else {
        this.alertS.open(res.message, 'error');
      }
    }
    );
  }
  getReport() {
    this.data1.dataX = [];
    this.data1.dataY = [];
    for (let index = 0; index < this.familyListC.length; index++) {
      const element = this.familyListC[index];
      this.data1.dataX[index] = element.codigoSap;
      this.data1.dataY[index] = element.cantidad;
    }
    this.data1.dataX.length = this.familyListC.length;
    this.data1.dataY.length = this.familyListC.length;
    this.barChartOptions = this.chartS.getBarChart('Seguimiento Diario', this.data1.dataX, this.data1.dataY);
    this.validador = true;
  }
}
