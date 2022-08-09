export class DocumentLoadEntity{
    id: number;
    documentId: number;
    documentName: string;
    userPropertyId: number;
    userPropertyIdentification: string;
    userPropertyName: string;
    documentPropertyName: String;
    extensionProperty: string;
    documentSaveName: string;
    version: number;
    creationUserId: number;
    creationDate: String;
    active: boolean;
    updateUserId: number;
    costCenter:string;
    centerCost: string;

    constructor(){}

}