// ✅ MODIFICATION ICI : On importe Component et Input depuis @angular/core
import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="getBadgeClasses()" 
          class="px-3 py-1 rounded-full text-xs font-bold uppercase transition-all shadow-sm border">
      {{ status }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  getBadgeClasses() {
    return {
      // Terminé (Vert)
      'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800': 
        ['terminé', 'completed', 'done'].includes(this.status.toLowerCase()),
      
      // En cours (Bleu)
      'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800': 
        ['en cours', 'progress', 'doing'].includes(this.status.toLowerCase()),
      
      // À faire (Orange)
      'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800': 
        ['à faire', 'todo', 'pending'].includes(this.status.toLowerCase()),

      // Par défaut (Gris)
      'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700': 
        !['terminé', 'en cours', 'à faire'].includes(this.status.toLowerCase())
    };
  }
}