import {Question} from './question';
import {Reponse} from './reponse';

export class Answer {
    id: number;
    question_id: number;
    text: string;
    created_at: string;
    question: Question;
    answer_responses: Reponse[];
}
