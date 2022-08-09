export class ScpAuditEntity{

    id:number;
    auditPreviousId:number;
    auditPreviousName:string;
    codeAudit:string;
    state:string;
    stateMotifId:number;
    stateMotifName:string;
    openPallet:boolean;
    typeAudit:string;
    levelRuleId:number;
    levelRuleName:string;
    levelRuleQuantityId:number;
    levelRuleQuantity:number;
    userId:number;
    userName:string;
    creationDate:string;
    active:boolean;
    customer:string;

    constructor(){}
}