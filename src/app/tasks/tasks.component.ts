import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';
import { AlertifyService } from '../shared/alertify.service';

// usar jquery
declare var $: any;

@Component({
   selector: 'tasks',
   templateUrl: './tasks.component.html',
   styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
   public tasks: Task[];
   public newTask: Task;

   public constructor(private taskService: TaskService, private alertify: AlertifyService) {
      this.newTask = new Task(null, '');
   }

   public ngOnInit() {
      this.taskService.getAll()
         .subscribe((tasks) => {
            this.tasks = tasks['data'].sort((a, b) => b.id - a.id);
         },
            error => this.alertify.msgAlert("Erro", "Ocorreu um erro no servidor, tente mais tarde.")//alert("Ocorreu um erro no servidor, tente mais tarde.")
         )
   }

   public createTask() {
      this.newTask.title = this.newTask.title.trim();

      if (!this.newTask.title) {
         this.alertify.msgAlert("Erro", "A terefa deve ter um título. Por favor, insira um título!");//alert("A tarefa deve ter um título.");
      } else {
         this.taskService.create(this.newTask)
            .subscribe(
               (task) => {
                  this.tasks.unshift(task['data']);
                  this.newTask = new Task(null, '');
               },
               () => this.alertify.msgAlert("Erro", "Ocorreu um erro no servidor, tente mais tarde.")
            )
      }
   }

   public deleteTask(task) {
      if (confirm(`Deseja realmente excluir a tarefa: "${task.attributes.title}"`)) {
         this.taskService.delete(task.id)
            .subscribe(
               () => this.tasks = this.tasks.filter(t => t !== task),
               () => this.alertify.msgAlert("Erro", "Ocorreu um erro no servidor, tente mais tarde.")
            )
      }
   }

}
