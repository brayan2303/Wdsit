export class ScpAuditSerialModel{

    id:number;
    codeAudit: string;
    auditPreviousId: string;
    auditPreviousName:string;
    state:string;
    stateMotifId:number;
    stateMotifName: string;
    openPallet:Boolean;
    typeAudit:string;
    typeAuditName:string;
    levelRuleId:number;
    levelRuleName:string;
    levelRuleQuantityId:number;
    levelRuleQuantity:number;
    userId:number;
    username:string;
    creationDate:string;
    active:Boolean;
    noveltyAccepted:number;
    noveltyRejected:number;
    reject:string;
    approvedRejected:string;
    
    constructor (){}
}