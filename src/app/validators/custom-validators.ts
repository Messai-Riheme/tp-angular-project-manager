import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../services/user'; // Ajustez le chemin selon votre projet

export class CustomValidators {
  
  // ✅ Validateur Asynchrone : Vérifie si l'email existe déjà
  static emailExistsValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      // On attend 500ms après la fin de la saisie avant de vérifier
      return timer(500).pipe(
        switchMap(() => userService.checkEmailExists(control.value)),
        map(exists => (exists ? { emailExists: true } : null)),
        catchError(() => of(null)) // En cas d'erreur serveur, on valide par défaut
      );
    };
  }

  // ✅ Validateur de force du mot de passe (Synchrone)
  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLengthValid = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;

      return !passwordValid ? { 
        passwordStrength: {
          hasUpperCase, hasLowerCase, hasNumeric, hasSpecialChar, isLengthValid
        } 
      } : null;
    };
  }

  // ✅ Validateur de correspondance (Match)
  static matchPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const formGroup = abstractControl as FormGroup;
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) return null;

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    };
  }
}