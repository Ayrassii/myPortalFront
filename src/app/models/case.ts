import {User} from './user';
import {Matiere} from './matiere';
import {Seance} from './seance';
import {Salle} from './salle';
import {Jour} from './jour';
import {Classe} from './classe';

export class Case {
    semaine: string;
    date_debut: string;
    date_fin: string;
    user: User;
    classe: Classe;
    matiere: Matiere;
    salle: Salle;
    seance: Seance;
    jour: Jour;
}
