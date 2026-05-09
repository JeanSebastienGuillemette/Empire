import { Component } from '@angular/core';
import { ServiceAuth } from '../services/service-auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  authStatus: boolean = false;
  isLoading = false;
  constructor(private service: ServiceAuth, private router:Router) { }
  ngOnInit() {
    this.authStatus = this.service.isAuth;
  }
  onSignIn() {
    this.isLoading = true;
    this.service.signIn().then(
      () => {
        this.isLoading = false;
        this.authStatus = this.service.isAuth;
        this.router.navigate(['vaisseaux']);
      }
    );
  }
    onSignOut() {
    this.service.signOut();
    this.authStatus = this.service.isAuth;
  }
}
