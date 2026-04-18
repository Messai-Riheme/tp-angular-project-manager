import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../task-list/task-list';
import { ProjectDetail } from '../project-detail/project-detail';
import { DashboardComponent } from '../dashboard/dashboard'; // ✅ Nouvel import
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule, 
    TaskList, 
    ProjectDetail, 
    DashboardComponent, // ✅ Ajouté aux imports
    FormsModule
  ],
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
      description: 'Développement de l\'application mobile',
      status: 'En cours',
      createdAt: new Date(),
      tasks: [
        { name: 'Tâche 1', priority: 'HAUTE', status: 'En attente' },
        { name: 'Tâche 2', priority: 'MOYENNE', status: 'En cours' }
      ]
    },
    {
      name: 'Projet 2',
      description: 'Refonte du site web institutionnel',
      status: 'Terminé',
      createdAt: new Date(Date.now() - 86400000), // Hier
      tasks: [
        { name: 'Tâche 1', priority: 'BASSE', status: 'Terminé' }
      ]
    }
  ];

  get filteredProjects() {
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateTaskStatus(project: any, taskIndex: number) {
    const task = project.tasks[taskIndex];
    const states = ['En attente', 'En cours', 'Terminé'];
    let currentIndex = states.indexOf(task.status);
    
    task.status = states[(currentIndex + 1) % states.length];
    this.notify(`Statut de "${task.name}" mis à jour : ${task.status}`);
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