import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { ProjectList} from './components/project-list/project-list';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectList, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project-manager');
}