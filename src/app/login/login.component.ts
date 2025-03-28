import {Component, OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {MatError, MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    MatFormField,
    MatError,
    FormsModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        console.log(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
