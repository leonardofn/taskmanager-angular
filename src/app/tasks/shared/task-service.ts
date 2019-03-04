import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Task } from './task.model';

//  header in HTTP
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class TaskService{
    public tasksUrl = "api/tasks";

    public constructor(private http: HttpClient){ }

    // Retorna um array com todas as tarefas existentes na base de dados
    public getAll(): Observable<Task[]>{
        return this.http.get<Task[]>(this.tasksUrl)
            .pipe(
                catchError(this.handleError)
            )
    }

    // Retorna algumas tarefas
    public getImportant(): Observable<Task[]> {
        return this.getAll().pipe(
            catchError(this.handleError),
            map(tasks =>  tasks.slice(0, 4))
            )  
    }

    // Retorna o endereço de uma tarefa específica
    public getById(id: number): Observable<Task>{
        const url = `${this.tasksUrl}/${id}`;

        return this.http.get<Task>(url).pipe(
            catchError(this.handleError)
        )
    }
    // Tutorial de apoio sobre HTTPCLIENT: https://angular.io/tutorial/toh-pt6

    public create(task: Task): Observable<Task>{
        return this.http.post<Task>(this.tasksUrl, task, httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    public update(task: Task): Observable<Task>{
    
        return this.http.put(this.tasksUrl, task, httpOptions)
            .pipe(
                catchError(this.handleError),
                map(() => task)
            )
    }

    public delete(id: number): Observable<null>{
        const url = `${this.tasksUrl}/${id}`;

        return this.http.delete(url, httpOptions)
            .pipe(
                catchError(this.handleError),
                map(() => null)
            )
    }

    /**
         * Handle Http operation that failed.
         * Let the app continue.    
    **/
    private handleError(error) {
        console.log("SALVANDO O ERRO EM UM ARQUIVO DE LOG - DETALHES DO ERRO =>", error);
        return throwError(error);
    }

}