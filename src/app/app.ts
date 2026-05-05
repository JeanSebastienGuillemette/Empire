import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ServiceAuth } from './services/service-auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = ("Magasin de vaisseaux de l'Empire");
  constructor(private service:ServiceAuth){}
}
