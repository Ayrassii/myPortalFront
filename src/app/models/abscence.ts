import {Seance} from './seance';
import {Matiere} from './matiere';
import {Classe} from './classe';

export class Abscence {
    date: string;
    justifie: boolean;
    seance: Seance;
    matiere: Matiere;
    classe: Classe;
}
