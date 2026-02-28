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

  getProgress() {
    if (!this.project?.tasks?.length) return 0;

    return (
      this.project.tasks.filter((t: any) => t.status === 'Terminé').length
      / this.project.tasks.length
    ) * 100;
  }
}