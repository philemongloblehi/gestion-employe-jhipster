import { IEmploie } from 'app/shared/model//emploie.model';

export interface ITache {
    id?: number;
    titre?: string;
    description?: string;
    emploies?: IEmploie[];
}

export class Tache implements ITache {
    constructor(public id?: number, public titre?: string, public description?: string, public emploies?: IEmploie[]) {}
}
