import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {User} from "../models/user.model";

@Component({
  selector: 'app-board-user',
  standalone: true,
  imports: [],
  templateUrl: './board-user.component.html',
  styleUrl: './board-user.component.css'
})
export class BoardUserComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.userService.getUserBoard().pipe(
    //   map((data: any) => {
    //     console.log(data)
    //     const user: User = {
    //       id: data.id,
    //       fullName: data.fullName,
    //       email: data.email,
    //     }
    //     console.log(data)
    //     return user;
    //   })
    // )
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
        console.log(data)
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
            console.error( `Error with status: ${err.status} - ${err.statusText}`)
          }
        } else {
          this.content = `Error with status: ${err.status}`;
          console.error( `Error with status: ${err.status}`)
        }
      }
    });
  }
}
