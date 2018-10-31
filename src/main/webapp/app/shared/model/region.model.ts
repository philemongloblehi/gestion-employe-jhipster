export interface IRegion {
    id?: number;
    regionLibelle?: string;
}

export class Region implements IRegion {
    constructor(public id?: number, public regionLibelle?: string) {}
}
