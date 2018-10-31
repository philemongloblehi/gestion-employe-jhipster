import { IRegion } from 'app/shared/model//region.model';

export interface IPays {
    id?: number;
    paysLibelle?: string;
    region?: IRegion;
}

export class Pays implements IPays {
    constructor(public id?: number, public paysLibelle?: string, public region?: IRegion) {}
}
