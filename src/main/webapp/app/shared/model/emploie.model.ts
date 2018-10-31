import { IEmploye } from 'app/shared/model//employe.model';
import { ITache } from 'app/shared/model//tache.model';

export interface IEmploie {
    id?: number;
    libelle?: string;
    minSalaire?: number;
    maxSalaire?: number;
    employe?: IEmploye;
    taches?: ITache[];
}

export class Emploie implements IEmploie {
    constructor(
        public id?: number,
        public libelle?: string,
        public minSalaire?: number,
        public maxSalaire?: number,
        public employe?: IEmploye,
        public taches?: ITache[]
    ) {}
}
