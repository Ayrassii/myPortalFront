import {User} from './user';

export class Comment {
    id: number;
    content: string;
    createdby_id: number;
    entry_id: number;
    created_at: string;
    owner: User;
}
