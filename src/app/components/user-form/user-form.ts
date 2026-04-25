import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

// Imports des services et directives selon votre arborescence tree /f
import { ValidationService } from '../../services/validation';
import { ShowErrorDirective } from '../../directives/show-error';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ShowErrorDirective // Import indispensable pour le template HTML
  ],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserFormComponent implements OnInit {
  // Utilisation de inject() pour une syntaxe moderne (Angular 14+)
  private fb = inject(FormBuilder);
  public validationService = inject(ValidationService); 
  
  userForm!: FormGroup;

  ngOnInit() {
    // Initialisation du formulaire principal
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      
      // Partie 5 : Initialisation du tableau d'adresses (FormArray)
      adresses: this.fb.array([this.createAddressGroup()], [Validators.required])
    });
  }

  /**
   * Crée un FormGroup individuel pour une adresse
   */
  createAddressGroup(): FormGroup {
    return this.fb.group({
      type: ['domicile', Validators.required],
      rue: ['', Validators.required],
      // Validation du code postal (format tunisien/international)
      codePostal: ['', [Validators.required, Validators.pattern('^[0-9]{4,5}$')]],
      ville: ['', Validators.required]
    });
  }

  /**
   * Getter pour accéder au FormArray dans le template HTML
   */
  get adresses(): FormArray {
    return this.userForm.get('adresses') as FormArray;
  }

  /**
   * Ajouter un nouveau bloc d'adresse vide
   */
  addAddress() {
    this.adresses.push(this.createAddressGroup());
  }

  /**
   * Supprimer une adresse spécifique par son index
   */
  removeAddress(index: number) {
    if (this.adresses.length > 1) {
      this.adresses.removeAt(index);
    }
  }

  /**
   * Getters pour simplifier l'accès aux contrôles dans le template
   */
  get nom() { return this.userForm.get('nom'); }
  get prenom() { return this.userForm.get('prenom'); }
  get email() { return this.userForm.get('email'); }

  /**
   * Soumission du formulaire
   */
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulaire validé avec succès !', this.userForm.value);
      alert('Profil enregistré avec succès.');
    } else {
      // Marque tous les champs comme "touchés" pour forcer l'affichage des erreurs
      this.userForm.markAllAsTouched();
      console.warn('Le formulaire contient des erreurs.');
    }
  }
}