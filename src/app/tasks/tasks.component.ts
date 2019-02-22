import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';

const TASKS: Array<Task> = [
    { id: 1, title: 'Fazer tarefa 1'},
    { id: 2, title: 'Fazer tarefa 2'},
    { id: 3, title: 'Fazer tarefa 3'},
    { id: 4, title: 'Fazer tarefa 4'},
    { id: 5, title: 'Fazer tarefa 5'},
    { id: 6, title: 'Fazer tarefa 6'},
    { id: 7, title: 'Fazer tarefa 7'}
];

@Component ({
    selector: 'tasks',
    templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
    public tasks;
    public selectedTask: Task;

    public constructor(){
    }

    public ngOnInit(){
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.tasks = TASKS;
    }

    public onSelect(task: Task): void {
        this.selectedTask = task;
    }
}