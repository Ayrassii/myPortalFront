import {Matiere} from './matiere';
import {Classe} from './classe';
import {Note} from './note';
export class Devoir {
  id: number;
  coeficient: number;
  date: string;
  type: string;
  matiere: Matiere;
  matiere_id: number;
  classe: Classe;
  classe_id: number;
  notes: Note[];
}
