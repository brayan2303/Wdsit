import { MasAccountEntity } from "./masAccount.entity";

export class MasMailEntity{
    id:number;
    subject:string;
    message:string;
    accountId:number;
    account:MasAccountEntity;
    creationDate:string;
    creationUserId:number;
    creationUser:string;

    constructor(){}
}