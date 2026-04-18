import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusEmoji',
  standalone: true
})
export class StatusEmojiPipe implements PipeTransform {
  transform(status: string): string {
    if (!status) return '';
    
    const s = status.toLowerCase();
    
    if (s.includes('terminé')) return '✅';
    if (s.includes('cours')) return '⏳';
    if (s.includes('attente')) return '🕒';
    
    return '📌'; // Emoji par défaut
  }
}