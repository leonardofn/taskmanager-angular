import { HttpClient, HttpResponse } from '@angular/common/http';
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
    public taskUrl = "api/tasks";

    public constructor(private http: HttpClient){ }

    public getTasks(): Observable<Task[]>{ // public getTasks(): Promise<Task[]>{}
        return this.http.get(this.taskUrl).pipe(
            map((response: Response) => response.json().data as Task[]))
    }

    public getImportantTasks(): Promise<Task[]> {
        return Promise.resolve(TASKS.slice(0, 3));
    }

    public getTask(id: number): Promise<Task>{
        return this.getTasks()
            .then((tasks) => tasks.find((task) => task.id === id))
    }
    
}