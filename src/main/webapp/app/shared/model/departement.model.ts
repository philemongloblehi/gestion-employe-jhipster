import { ILocalisation } from 'app/shared/model//localisation.model';
import { IEmploye } from 'app/shared/model//employe.model';

export interface IDepartement {
    id?: number;
    departementLibelle?: string;
    localisation?: ILocalisation;
    employes?: IEmploye[];
}

export class Departement implements IDepartement {
    constructor(
        public id?: number,
        public departementLibelle?: string,
        public localisation?: ILocalisation,
        public employes?: IEmploye[]
    ) {}
}
