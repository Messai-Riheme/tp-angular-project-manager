import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, TaskList],
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

  // ✅ Méthode de mise à jour du statut (Logique de cycle)
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
    // Note : getProgress() sera automatiquement ré-exécuté par Angular car la donnée a changé.
  }
}