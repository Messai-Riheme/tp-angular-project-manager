import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusEmojiPipe } from '../../pipes/status-emoji-pipe';
import { PriorityColorPipe } from '../../pipes/priority-color-pipe'; // ✅ Import de votre pipe
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, 
    StatusEmojiPipe, 
    PriorityColorPipe, // ✅ Déclarée ici
    FormsModule
  ],
  templateUrl: './task-list.html',
})
export class TaskList {
  @Input() tasks: any[] = [];
  @Output() statusChanged = new EventEmitter<number>();

  priorityFilter: string = 'TOUTES';

  get filteredTasks() {
    if (this.priorityFilter === 'TOUTES') return this.tasks;
    return this.tasks.filter(t => t.priority === this.priorityFilter);
  }

  changeStatus(index: number) {
    this.statusChanged.emit(index);
  }
}