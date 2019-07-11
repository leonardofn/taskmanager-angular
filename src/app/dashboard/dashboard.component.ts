import { Component, OnInit } from '@angular/core';

import { Task } from '../tasks/shared/task.model';
import { TaskService } from '../tasks/shared/task.service';
import { AlertifyService } from '../shared/alertify.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    public tasks: Task[];

    public constructor(private taskService: TaskService, private alertify: AlertifyService){ }

    public ngOnInit(){
        this.taskService.getImportant()
            .subscribe(
                (tasks) => this.tasks = tasks['data'],
                (error) => this.alertify.msgAlert("Erro","Ocorreu um erro no servidor, tente mais tarde.")
            );
    }
}
