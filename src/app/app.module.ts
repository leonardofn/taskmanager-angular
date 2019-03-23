// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


// angular plugins imports
import { AngularTokenService, AngularTokenModule, AngularTokenOptions } from 'angular-token';

// components imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TaskSearchComponent } from './navbar/task-search/task-search.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

// service imports
import { TaskService } from './tasks/shared/task.service';
import { AuthService } from './shared/auth.service';

// guards imports
import { AuthGuard } from './guards/auth.guard';

// modules imports
import { AppRoutingModule } from './app-routing.module';

// jquery plugins
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TaskSearchComponent,
    TasksComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://api.task-manager.test:3000', // endereço da api feita em Rails
    })
  ],
  providers: [ 
    AuthGuard,
    AngularTokenModule,
    AuthService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
