import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { UserService } from '../../services/user'; // ✅ Import du service

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
})
export class ContactForm implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService); // ✅ Injection du service
  
  contactForm!: FormGroup;

  ngOnInit() {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      
      // ✅ Application du validateur asynchrone en 3ème paramètre
      email: ['', 
        [Validators.required, Validators.email], 
        [CustomValidators.emailExistsValidator(this.userService)]
      ],
      
      telephone: ['', [Validators.pattern(/^0[1-9][0-9]{8}$/)]],
      password: ['', [Validators.required, CustomValidators.passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      validators: [CustomValidators.matchPasswordValidator('password', 'confirmPassword')]
    });
  }

  // Getters
  get nom() { return this.contactForm.get('nom'); }
  get prenom() { return this.contactForm.get('prenom'); }
  get email() { return this.contactForm.get('email'); }
  get telephone() { return this.contactForm.get('telephone'); }
  get password() { return this.contactForm.get('password'); }
  get confirmPassword() { return this.contactForm.get('confirmPassword'); }
  get message() { return this.contactForm.get('message'); }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Données envoyées :', this.contactForm.value);
    }
  }
}