export class ProMeasurementEntity{
    id:number;
    proyectPlan:string;
    perspectiveId:number;
    perspective:string;
    strategicObjetiveId:number
    strategicObjetive:string;
    indicatorId:number;
    indicator:string;
    direction:string;
    formulaId:number;
    formula:string;
    frecuencyId:number;
    frecuency:string;
    year:number;
    goalType:string;
    goal:number;
    responsibleUserId:number;
    responsibleUser:string;
    leaderId:number;
    active:boolean;

    constructor(){}
}