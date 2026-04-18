import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  @Input() projects: any[] = [];

  // o Le nombre total de projets
  getTotalProjects(): number {
    return this.projects.length;
  }

  // o Le nombre total de tâches
  getTotalTasks(): number {
    return this.projects.reduce((acc, project) => acc + (project.tasks?.length || 0), 0);
  }

  // o Le pourcentage global de progression
  getGlobalProgress(): number {
    const totalTasks = this.getTotalTasks();
    if (totalTasks === 0) return 0;

    const completedTasks = this.projects.reduce((acc, project) => {
      const completedInProject = project.tasks?.filter((t: any) => t.status === 'Terminé').length || 0;
      return acc + completedInProject;
    }, 0);

    return (completedTasks / totalTasks) * 100;
  }
}