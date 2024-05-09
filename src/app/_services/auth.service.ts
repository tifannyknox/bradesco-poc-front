import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {environment} from "../../environments/environment";

const URL_AUTH = environment.apiUrlAuth;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      URL_AUTH + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post(
      URL_AUTH + 'signup',
      {
        fullName,
        email,
        password,
      },
      httpOptions
    );
  }

  getFullName(): Observable<string> {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      if (typeof user.fullName === 'string') {
        return of(user.fullName);
      }
    }

    return of('');
  }

  logout(): Observable<any> {
    return this.http.post(
      URL_AUTH + 'logout',
      {
      },
      httpOptions
    );
  }

}
