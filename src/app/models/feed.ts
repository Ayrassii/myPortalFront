import {User} from './user';
import {Classe} from './classe';

export class Feed {
  titre: string;
  slug: string;
  image: string;
  date: string;
  contenu: string;
  type: string;
  user: User;
  classes: Classe[];
  professeurs: User[];
  etudiants: User[];
}
