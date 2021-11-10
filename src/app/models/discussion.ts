import {Message} from './message';

export class Discussion {
    id: number;
    createdby_id: number;
    destination_id: number;
    messages: Message[];
}
