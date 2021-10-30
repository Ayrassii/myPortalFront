import {User} from './user';

export class Demande {
    user: User;
    created_at: string;
    description: string;
    constructor(public type: string) {}
}
