import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../task-list/task-list';
import { StatusBadgeComponent } from '../status-badge/status-badge'; // ✅ Import du nouveau composant
import { FriendlyDatePipe } from '../../pipes/friendly-date-pipe';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TaskList, StatusBadgeComponent,FriendlyDatePipe], // ✅ Ajouté ici
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  @Input() project: any;

  // ✅ Calcul automatique de la progression
  getProgress() {
    if (!this.project?.tasks?.length) return 0;
    const completedTasks = this.project.tasks.filter((t: any) => t.status === 'Terminé').length;
    return (completedTasks / this.project.tasks.length) * 100;
  }

  // ✅ Méthode de mise à jour du statut
  updateTaskStatus(index: number) {
    const task = this.project.tasks[index];
    switch (task.status) {
      case 'En attente':
        task.status = 'En cours';
        break;
      case 'En cours':
        task.status = 'Terminé';
        break;
      case 'Terminé':
        task.status = 'En attente';
        break;
    }
  }
}