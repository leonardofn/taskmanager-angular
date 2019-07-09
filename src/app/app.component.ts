import { Component } from '@angular/core';

import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = "Gerenciador de Tarefas";
  
  public constructor(private tokenService: AngularTokenService){ }

}
