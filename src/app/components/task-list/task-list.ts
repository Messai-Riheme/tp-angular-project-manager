import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightStatusDirective } from '../../directives/highlight-status';
import { PriorityColorPipe } from '../../pipes/priority-color-pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, HighlightStatusDirective, PriorityColorPipe],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList {
  @Input() tasks: any[] = [];

  // ✅ Émetteur d'événement pour le changement de statut
  @Output() statusChanged = new EventEmitter<number>();

  // Méthode appelée au clic sur le bouton
  changeStatus(index: number) {
    this.statusChanged.emit(index);
  }
}