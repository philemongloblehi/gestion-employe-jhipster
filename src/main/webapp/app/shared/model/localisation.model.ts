import { IPays } from 'app/shared/model//pays.model';

export interface ILocalisation {
    id?: number;
    adresse?: string;
    codePostal?: string;
    ville?: string;
    province?: string;
    pays?: IPays;
}

export class Localisation implements ILocalisation {
    constructor(
        public id?: number,
        public adresse?: string,
        public codePostal?: string,
        public ville?: string,
        public province?: string,
        public pays?: IPays
    ) {}
}
