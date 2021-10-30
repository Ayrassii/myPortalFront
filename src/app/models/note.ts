import {Devoir} from './devoir';
import {User} from './user';

export class Note {
    id: number;
    mark: number;
    devoir: Devoir;
    user: User;
}
