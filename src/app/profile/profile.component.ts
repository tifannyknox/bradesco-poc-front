import {Component, OnInit} from '@angular/core';
import { StorageService } from '../_services/storage.service';
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../_services/auth.service";
import {UserService} from "../_services/user.service";
import {catchError, map, tap} from "rxjs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private http: HttpClient, private authService: AuthService, private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAuthenticatedUser();
  }

  getAuthenticatedUser() {
    const token = this.storageService.getToken();

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    this.userService.getUserBoard().pipe(
      map(response => {
          console.log('Usuário autenticado:', response)
      }),
      catchError(error => {
        console.error('Erro ao obter usuário autenticado:', error);
        throw error; // Re-throw para que o erro continue sendo propagado
      })).subscribe()
  }
  // constructor(private storageService: StorageService) { }

  // ngOnInit(): void {
  //   this.currentUser = this.storageService.getUser();
  // }
}
