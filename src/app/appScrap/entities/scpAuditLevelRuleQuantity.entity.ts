export class ScpAuditLevelRuleQuantityEntity{

    id:number;
    levelRuleId:number;
    levelRuleName:string;
    quantityMin:number;
    quantityMax:number;
    noveltyAccepted:number;
    noveltyRejected:number;
    show:number;
    userId:number;
    userName:string;
    creationDate:string;
    active:boolean;

    constructor(){}
}