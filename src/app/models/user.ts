import {Classe} from './classe';
import {Formation} from './formation';

export class User {
  id: number;
  cin: string;
  email: string;
  email_verified_at: string;
  image: string;
  prenom: string;
  prenom_ar: string;
  prenom_en: string;
  nom: string;
  nom_ar: string;
  nom_en: string;
  gendre: string;
  lieu_naissance: string;
  lieu_naissance_ar: string;
  lieu_naissance_en: string;
  date_naissance: string;
  role: string;
  token: string;
  error: string;
  classe: Classe;
  formations: Formation[];
}
