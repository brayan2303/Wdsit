export class DisDailyOperationEntity{
    id:number;
    countryId:number;
    country:string;
    departmentId:number;
    department:string;
    cityId:number;
    city:string;
    customerId:number;
    customer:string;
    year:number;
    monthId:number;
    accumulatedLogistic:number;
    goalLogstic:number;
    accumulatedProduction:number;
    goalProduction:number;
    accumulatedReconditioning:number;
    goalReconditioning:number;
    accumulatedMakeover:number;
    goalMakeover:number;
    dispatch:number;
    accumulatedRepair:number;
    goalRepair:number;

    constructor(){}
}