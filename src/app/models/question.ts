import {Answer} from './answer';

export class Question {
    id: number;
    createdby_id: number;
    content: string;
    created_at: string;
    answers: Answer[];
    responses_count: number;
    answered: boolean;
}
