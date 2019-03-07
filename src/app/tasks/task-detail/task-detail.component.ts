import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators'; // para versões do rxjs > 5.5
import { Location } from '@angular/common';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
    public task: Task;

    public taskDoneOptions: Array<any> = [
        { value: false, text: 'Pendente' },
        { value: true, text: 'Feita' }
    ];

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location
    ){ }

    public ngOnInit(){
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.taskService.getById(+params['id'])// "+" => converte uma string (e.g.: "1") em um objeto tipo number (1)
            }))
            .subscribe(
                task => this.task = task,
                error => alert("Ocorreu um erro no servidor, tente mais tarde.")
            );
    }

    public goBack(){
        this.location.back();
    }

    public updateTask(){
        if (!this.task.title) {
            alert("A tarefa deve ter um título");
        }else{
            this.taskService.update(this.task)
                .subscribe(
                    () => alert("Tarefa atualizada com sucesso!"),
                    () => alert("Ocorreu um erro no servidor, tente mais tarde.")
                );
        }
    }

    public showFieldError(field): boolean{
        return field.invalid && (field.touched || field.dirty);
    }
}