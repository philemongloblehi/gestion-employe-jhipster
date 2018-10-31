import { Moment } from 'moment';
import { IDepartement } from 'app/shared/model//departement.model';
import { IEmploie } from 'app/shared/model//emploie.model';
import { IEmploye } from 'app/shared/model//employe.model';

export interface IEmploye {
    id?: number;
    nom?: string;
    prenom?: string;
    email?: string;
    contact?: string;
    dateCreation?: Moment;
    salaire?: number;
    commission?: number;
    departement?: IDepartement;
    emploies?: IEmploie[];
    manager?: IEmploye;
}

export class Employe implements IEmploye {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public email?: string,
        public contact?: string,
        public dateCreation?: Moment,
        public salaire?: number,
        public commission?: number,
        public departement?: IDepartement,
        public emploies?: IEmploie[],
        public manager?: IEmploye
    ) {}
}
