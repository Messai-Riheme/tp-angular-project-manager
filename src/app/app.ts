import { Component, signal, Renderer2, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT, CommonModule } from '@angular/common'; // Ajoutez CommonModule si besoin

import { ProjectList } from './components/project-list/project-list';
import { ContactForm } from './components/contact-form/contact-form';
import { UserFormComponent } from './components/user-form/user-form'; // ✅ Ajout de l'import

@Component({
  selector: 'app-root',
  standalone: true,
  // ✅ Ajoutez UserFormComponent ici
  imports: [RouterOutlet, ProjectList, ContactForm, UserFormComponent, CommonModule], 
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
    
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark');
    }
  }
}