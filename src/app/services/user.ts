import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Simuler une base de données d'emails déjà pris
  private existingEmails = ['rihem@example.com', 'admin@projet.tn'];

  checkEmailExists(email: string): Observable<boolean> {
    const exists = this.existingEmails.includes(email);
    // Simulation du délai réseau
    return of(exists).pipe(delay(1500));
  }
}