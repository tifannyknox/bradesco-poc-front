import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  content?: string;
  user?: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getFullName().subscribe(username => {
      this.user = username;
    });
    // this.userService.getPublicContent().subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.content = data;
    //   },
    //   error: err => {console.log(err)
    //     if (err.error) {
    //       this.content = JSON.parse(err.error).message;
    //     } else {
    //       this.content = "Error with status: " + err.status;
    //     }
    //   }
    // });
  }
}
