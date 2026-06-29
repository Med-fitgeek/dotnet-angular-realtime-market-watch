import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  username! : string;
  email! : string
  password! : string;
  error: string | null = null;

  constructor(private authService: AuthService) { }

  onRegister() {
    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: (res) => {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      },
      error: (err) => {

      this.error = 'Erreur lors de l\'inscription. Veuillez réessayer.'
      }
    });
  }
}
