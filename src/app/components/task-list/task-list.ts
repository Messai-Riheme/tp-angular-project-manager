import { Component, Input } from '@angular/core'; // N'oubliez pas l'import de Input
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  // 3. Déclarez l'entrée pour corriger l'erreur NG8002
  @Input() tasks: any[] = []; 
}