import {Message} from './message';
import {User} from './user';

export class Discussion {
    id: number;
    createdby_id: number;
    destination_id: number;
    messages: Message[];
    creator: User;
    destination: User;
}
