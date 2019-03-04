import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // para versões do rxjs > 5.5
import { of } from 'rxjs';
import {debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Task } from '../../tasks/shared/task.model';
import { TaskService } from '../../tasks/shared/task.service';

@Component({
    selector: 'task-search',
    templateUrl: './task-search.component.html'
})

export class TaskSearchComponent implements OnInit{
    public searchTerms: Subject<string> = new Subject();
    public tasks: Task[] = [];

    public constructor (private taskService: TaskService, private router: Router){ }

    public ngOnInit(){
        this.searchTerms.pipe( // pipe é usado apenas para envolver qualquer operador.
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(
                term => term ? this.taskService.searchByTitle(term) : of<Task[]>([])
            )
        ).subscribe(tasks => this.tasks = tasks)
    }

    public search(term: string){
        this.searchTerms.next(term);
    }

    public gotoTask(task: Task){
        this.tasks = [];
        this.router.navigate(['/tasks', task.id]);
    }
}