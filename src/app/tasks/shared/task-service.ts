import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from './task.model';

const TASKS: Array<Task> = [
    { id: 1, title: 'Fazer tarefa 1' },
    { id: 2, title: 'Fazer tarefa 2' },
    { id: 3, title: 'Fazer tarefa 3' },
    { id: 4, title: 'Fazer tarefa 4' },
    { id: 5, title: 'Fazer tarefa 5' },
    { id: 6, title: 'Fazer tarefa 6' },
    { id: 7, title: 'Fazer tarefa 7' }
];

@Injectable()

export class TaskService{
    public tasksUrl = "api/tasks";

    public constructor(private http: HttpClient){ }

    // Retorna um array com todas as tarefas existentes na base de dados
    public getTasks(): Observable<Task[]>{
        return this.http.get<Task[]>(this.tasksUrl)
    }

    // Retorna algumas tarefas
    public getImportantTasks(): Observable<Task[]> {
        return this.getTasks().pipe(
            map(tasks =>  tasks.slice(0, 4)));
    }

    // Retorna o endereço de uma tarefa específica
    public getTask(id: number): Observable<Task>{
        const url = `${this.tasksUrl}/${id}`;
        console.log(url);
        return this.http.get<Task>(url)
    }
    // Tutorial de apoio sobre HTTPCLIENT: https://angular.io/tutorial/toh-pt6
}