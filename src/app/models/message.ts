import {User} from './user';
import {Discussion} from './discussion';

export class Message {
    id: number;
    createdby_id: number;
    destination_id: number;
    discussion_id: number;
    body: string;
    created_at: string;
    sender: User;
    receiver: User;
    discussion: Discussion;
}
