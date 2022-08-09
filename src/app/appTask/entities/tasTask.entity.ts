export class TasTaskEntity{
    id:number;
    title:string;
    priority:string;
    status:string;
    type:string;
    startDate:string;
    endDate:string;
    requestPersonId:number;
    requestPerson:string;
    assignedPersonId:number;
    assignedPerson:string;

    constructor(){}
}