import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowError]',
  standalone: true
})
export class ShowErrorDirective implements OnInit, OnDestroy {
  // Injections nécessaires pour une directive structurelle
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  // 2. Utiliser @Input() pour recevoir le contrôle et le type d'erreur
  @Input('appShowError') control!: AbstractControl | null;
  @Input('appShowErrorErrorType') errorType!: string;

  private sub?: Subscription;

  ngOnInit() {
    if (this.control) {
      // 3. S’abonner à statusChanges pour mettre à jour la vue dynamiquement
      this.sub = this.control.statusChanges.subscribe(() => {
        this.updateView();
      });
      // Appel initial pour vérifier l'état actuel
      this.updateView();
    }
  }

  private updateView() {
    const hasSpecificError = this.control?.hasError(this.errorType);
    const isTouched = this.control?.touched;

    // Si l'erreur existe et que le champ a été manipulé, on affiche le template
    if (hasSpecificError && isTouched) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      // Sinon, on vide le container (le message disparaît)
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    // Très important : se désabonner pour éviter les fuites de mémoire
    this.sub?.unsubscribe();
  }
}