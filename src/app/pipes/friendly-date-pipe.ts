import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyDate',
  standalone: true
})
export class FriendlyDatePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    
    const date = new Date(value);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    
    return date.toLocaleDateString(); // Retourne la date normale si plus de 7 jours
  }
}