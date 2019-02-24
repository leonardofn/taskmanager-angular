import { Injectable } from '@angular/core';

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

    public getTasks(): Promise<Task[]>{ // public getTasks(): Promise<Task[]>{}
        // Deve-se especificar o tipo Promise de retorno diretamente: return new Promise((resolve, reject) => {}
        return new Promise((resolve, reject) => { 
            if(TASKS.length > 0){
                resolve(TASKS); // Sucesso
            }else{
                let error_msg = "NAO HA TAREFAS";  // let => Variável local
                reject(error_msg);
            }
        })
    }

    public getImportantTasks(): Promise<Task[]> {
        return Promise.resolve(TASKS.slice(0, 3));
    }
    
}