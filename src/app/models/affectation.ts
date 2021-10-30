import {User} from './user';
import {Matiere} from './matiere';
import {Classe} from './classe';

export class Affectation {
    user: User;
    matiere: Matiere;
    classe: Classe;
    classe_id: number;
}
