import { Injectable } from '@angular/core';
import {Question} from '../models/question';
import {Subject} from 'rxjs';
import {Devoir} from '../models/devoir';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Globals} from '../Globals';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    question: Question;
    answered: boolean;
    responses_count: number;
    questionSubject = new Subject<Question>();
    url = this.global.Server;
    constructor(private httpClient: HttpClient, private router: Router, private global: Globals) { }

    emitQuestion() {
        this.questionSubject.next({...this.question, answered: this.answered, responses_count: this.responses_count});
    }
    getQuestionFromServer() {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        this.httpClient.get(this.url + 'question', {headers})
            .subscribe(
                (response: any) => {
                    this.question = response['question'];
                    this.answered = response['answered'];
                    this.responses_count = response['responses_count'];
                    this.emitQuestion();
                },
                (err) => {
                    if (err.status === 401) {
                        this.router.navigate(['authentication/page-403']);
                    }
                }
            );
    }

    answerQuestion({question_id, answer_id}) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.post(this.url + 'question', {question_id, answer_id}, {headers});
    }

    addQuestion(contenu, answers) {
        const headers = new HttpHeaders()
            .set('authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.post(this.url + 'addquestion', {contenu, answers}, {headers});
    }
}
