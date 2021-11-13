import {User} from './user';

export class Participation {
    id: number;
    user_id: number;
    entry_id: number;
    created_at: string;
    owner: User;
}
