import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../task-list/task-list';
import { ProjectDetail } from '../project-detail/project-detail';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, TaskList, ProjectDetail, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {

  // 🔹 Variables
  projectOuvert: number | null = null;
  searchTerm: string = '';
  selectedProject: any = null;

  // 🔹 Données
  projects = [
    {
      name: 'Projet 1',
      description: 'Description 1',
      status: 'En cours',
      tasks: [
        { title: 'Tâche 1', priority: 'Haute', status: 'En attente' },
        { title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' }
      ]
    },
    {
      name: 'Projet 2',
      description: 'Description 2',
      status: 'Terminé',
      tasks: [
        { title: 'Tâche 1', priority: 'Basse', status: 'Terminé' }
      ]
    }
  ];

  // 🔹 Getter propre pour filtrage
  get filteredProjects() {
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // 🔹 Méthodes
  toggleProjet(index: number) {
    this.projectOuvert =
      this.projectOuvert === index ? null : index;
  }

  selectProject(project: any) {//Cette variable va stocker le projet sélectionné
    this.selectedProject = project;
  }
}
