import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

export class TaskDetailComponent implements OnInit, AfterViewInit{
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

        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.taskService.getById(+params['id'])// "+" => converte uma string (e.g.: "1") em um objeto tipo number (1)
            }))
            .subscribe(
                task => this.setTask(task),
                error => alert("Ocorreu um erro no servidor, tente mais tarde.")
            );
    }

    public setTask(task: Task): void {
        this.task = task;

        //setValue
        // let formModel = {
        //     title: task.title || null,
        //     done: task.done || null,
        //     deadline: task.deadline || null,
        //     description: task.description || null,
        // }

        this.form.patchValue(task);
    }

    public ngAfterViewInit(){
        // $("#deadline").datetimepicker({
        //     'sideByside': true,
        //     'locale': 'pt-br'
        // }).on('dp.change', () => this.reactiveTaskForm.get('deadline').setValue($("#deadline").val()));
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