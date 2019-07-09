import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'; // para versões do rxjs > 5.5
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FormUtils } from '../../shared/form.utils';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html'
    // styles: [".form-control-feedback{ margin-right:20px }"] Adicionar css específico a uma class
})

export class TaskDetailComponent implements OnInit{
    public form: FormGroup;
    public task: Task;
    public taskDoneOptions: Array<any>;
    public formUtils: FormUtils;

    public constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder
    ){
        this.taskDoneOptions = [
            { value: false, text: 'Pendente' },
            { value: true, text: 'Feita' }
        ];

        this.form = this.formBuilder.group({
            title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            deadline: [null, Validators.required],
            done: [null, Validators.required],
            description: [null]
        })

        this.formUtils = new FormUtils(this.form);
    }

    public ngOnInit(){
        this.task = new Task(null, null);

        this.route.paramMap.pipe(
            switchMap((params) => {
                const id = +params.get('id');
                return this.taskService.getById(id)// "+" => converte uma string (e.g.: "1") em um objeto tipo number (1)
            }))
            .subscribe(
                (task: any) => this.setTask(task['data']),
                error => alert("Ocorreu um erro no servidor, tente mais tarde.")
            );
    }

    public setTask(task: any): void {
        this.task = task;

        this.form.patchValue({
            'title': task.attributes.title,
            'description': task.attributes.description,
            'done': task.attributes.done,
            'deadline': task.attributes.deadline,
        });
    }

    public goBack(){
        this.location.back();
    }

    public updateTask(){
        this.task.title = this.form.get('title').value;
        this.task.deadline = this.form.get('deadline').value;
        this.task.done = this.form.get('done').value;
        this.task.description = this.form.get('description').value;

        this.taskService.update(this.task)
            .subscribe(
                () => alert("Tarefa atualizada com sucesso!"),
                () => alert("Ocorreu um erro no servidor, tente mais tarde.")
            );
    }

}
