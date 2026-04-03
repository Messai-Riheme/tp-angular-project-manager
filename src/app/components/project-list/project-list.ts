import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../task-list/task-list';
import { ProjectDetail } from '../project-detail/project-detail';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, TaskList, ProjectDetail, FormsModule], // ✅ Importations OK
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, scale: 0.9 }))
      ])
    ]),
    trigger('toastAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProjectList {
  projectOuvert: number | null = null;
  searchTerm: string = '';
  selectedProject: any = null;
  notification: string | null = null;

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

  get filteredProjects() {
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleProjet(index: number) {
    this.projectOuvert = this.projectOuvert === index ? null : index;
  }

  selectProject(project: any) {
    this.selectedProject = project;
  }

  deleteProject(index: number) {
    const name = this.projects[index].name;
    this.projects.splice(index, 1);
    this.notify(`Le projet ${name} a été supprimé !`);
  }

  notify(msg: string) {
    this.notification = msg;
    setTimeout(() => this.notification = null, 3000);
  }
}