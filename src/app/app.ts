import { Component, signal, Renderer2, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { ProjectList } from './components/project-list/project-list';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CHEF DE PROJET');
  isDarkMode = signal(false);

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  toggleDarkMode() {
    this.isDarkMode.update(value => !value);
    
    // On applique la classe sur <html> pour que tout le projet soit impacté
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }
  }
}