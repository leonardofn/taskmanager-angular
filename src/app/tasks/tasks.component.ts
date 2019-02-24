import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task-service';

@Component ({
    selector: 'tasks',
    templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
    public tasks: Array<Task>;
    public selectedTask: Task;

    public constructor(private taskService: TaskService){ }

    public ngOnInit(){
        this.taskService.getTasks()
            .then((tasks) => this.tasks = tasks) // Arrow function
            .catch((error_msg) => alert(error_msg)); // Arrow function
    }

    public onSelect(task: Task): void {
        this.selectedTask = task;
    }
}