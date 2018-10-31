import { Moment } from 'moment';
import { IEmploie } from 'app/shared/model//emploie.model';
import { IDepartement } from 'app/shared/model//departement.model';
import { IEmploye } from 'app/shared/model//employe.model';

export const enum Langue {
    FRANCAIS = 'FRANCAIS',
    ANGLAIS = 'ANGLAIS',
    ESPAGNOL = 'ESPAGNOL'
}

export interface IEmploieHistory {
    id?: number;
    dateDebut?: Moment;
    dateFin?: Moment;
    langue?: Langue;
    emploie?: IEmploie;
    departement?: IDepartement;
    employe?: IEmploye;
}

export class EmploieHistory implements IEmploieHistory {
    constructor(
        public id?: number,
        public dateDebut?: Moment,
        public dateFin?: Moment,
        public langue?: Langue,
        public emploie?: IEmploie,
        public departement?: IDepartement,
        public employe?: IEmploye
    ) {}
}
