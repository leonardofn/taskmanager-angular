import { Component, OnInit } from '@angular/core';

import { Task } from '../tasks/shared/task.model';
import { TaskService } from '../tasks/shared/task.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    public tasks: Task[];

    public constructor(private taskService: TaskService){
        
    }

    public ngOnInit(){
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.taskService.getImportant()
            .subscribe(
                (tasks) => this.tasks = tasks,
                error => alert("Ocorreu um erro no servidor, tente mais tarde.")
            );
    }
}