import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Task } from './task.model';

// header in HTTP requests
const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.taskmanager.v2' // Versão 2 da API
        }
    )
};
const apiBase = 'https://taskmanager-api-leonardo.herokuapp.com';
@Injectable()

export class TaskService {
    public tasksUrl = 'tasks';

    public constructor(private http: HttpClient) { }
    // Retorna um array com todas as tarefas existentes na base de dados
    public getAll(): Observable<Task[]> {
        // ${this.tasksUrl}? => Core String
         // a última tarefa a ser alterada será a primeira da lista
        const url = `${apiBase}/${this.tasksUrl}?q[s]=updated-at+DESC`;
        // https://blog.florimondmanca.com/consuming-apis-in-angular-the-model-adapter-pattern
        return this.http.get<Task[]>(url, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Retorna algumas tarefas
    public getImportant(): Observable<Task[]> {
        // as terefas serão ordenadas de forma ascendente
        const url = `${apiBase}/${this.tasksUrl}?q[s]=deadline+ASC`;

        return this.http.get<Task[]>(url, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Retorna o endereço de uma tarefa específica
    public getById(id: number): Observable<Task> {
        const url = `${apiBase}/${this.tasksUrl}/${id}`;

        return this.http.get<Task>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    // Tutorial de apoio sobre HTTPCLIENT: https://angular.io/tutorial/toh-pt6
    public create(task: Task): Observable<Task> {
        const url = `${apiBase}/${this.tasksUrl}`;

        return this.http.post<Task>(url, task, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    public update(task: Task): Observable<Task> {
        const url = `${apiBase}/${this.tasksUrl}/${task.id}`;

        return this.http.put(url, task, httpOptions)
            .pipe(
                map(() => task),
                catchError(this.handleError)
            );
    }

    public delete(id: number): Observable<null> {
        const url = `${apiBase}/${this.tasksUrl}/${id}`;

        return this.http.delete(url, httpOptions)
            .pipe(
                catchError(this.handleError),
                map(() => null)
            );
    }

    public searchByTitle(term: string): Observable<Task[]> {
        const url = `${apiBase}/${this.tasksUrl}?q[title_cont]=${term}`;

        return this.http.get<Task[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error) {
        console.log("ERROR: DETALHES DO ERRO =>", error);
        return throwError(error);
    }
}
