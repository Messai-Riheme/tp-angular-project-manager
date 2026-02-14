import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importez la classe du composant enfant
import { TaskList } from '../task-list/task-list'; 

@Component({
  selector: 'app-project-list',
  standalone: true,
  
  imports: [CommonModule, TaskList], 
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
   // Stocke l'index du projet ouvert (null si tout est fermé)
  projectOuvert: number | null = null;
  projects = [
{name: 'Projet 1', description: 'Description 1', status: 'En cours', tasks: [
{ title: 'Tâche 1', priority: 'Haute', status: 'En attente' },
{ title: 'Tâche 2', priority: 'Moyenne', status: 'En cours' }
]
},
{name: 'Projet 2',description: 'Description 2',status: 'Terminé',tasks: [
{ title: 'Tâche 1', priority: 'Basse', status: 'Terminé' }
]
}
];
  // Fonction pour ouvrir/fermer un projet
  toggleProjet(index: number) {
    if (this.projectOuvert === index) {
      this.projectOuvert = null; // Referme si on reclique sur le même
    } else {
      this.projectOuvert = index; // Ouvre le nouveau
    }
  }


}

