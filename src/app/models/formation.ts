import {Partieformation} from './partieformation';
import {User} from './user';
import {Niveau} from './niveau';

export class Formation {
    id: number;
    image: string;
    slug: string;
    duration: number;
    titre: string;
    description: string;
    user: User;
    niveau: Niveau;
    partieformations: Partieformation[];
    created_at: string;
}
