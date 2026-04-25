import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  // Centralisation de tous les messages d'erreur demandés
  getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    // Erreurs standards Angular
    if (errors['required']) return 'Ce champ est obligatoire.';
    if (errors['email']) return 'Format d\'email invalide (ex: riheme.messai@gmail.com).';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} caractères.`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} caractères.`;
    if (errors['min']) return `La valeur minimale est ${errors['min'].min}.`;
    if (errors['max']) return `La valeur maximale est ${errors['max'].max}.`;
    if (errors['pattern']) return 'Le format saisi est incorrect.';
    
    // Erreurs personnalisées de la Question 1.2
    if (errors['passwordStrength']) return 'Le mot de passe doit être plus complexe.';
    if (errors['mustMatch']) return 'Les champs ne correspondent pas.';
    if (errors['emailExists']) return 'Cet email est déjà enregistré.';

    return 'Champ invalide.';
  }

  // Méthode pour vérifier une erreur spécifique (Question 1.3)
  hasError(control: AbstractControl | null, errorType: string): boolean {
    return !!(control && control.hasError(errorType) && control.touched);
  }
}