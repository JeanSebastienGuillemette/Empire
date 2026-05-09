import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ServiceVaisseau } from '../services/service-vaisseau';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-vaisseau',
  imports: [FormsModule],
  templateUrl: './edit-vaisseau.html',
  styleUrl: './edit-vaisseau.scss',
})
export class EditVaisseau {
  defaultOnOff = 'Non disponible';
  constructor(private vaisseauService: ServiceVaisseau, private route: ActivatedRoute, private router2: Router) { }
  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];
    this.vaisseauService.addVaisseau(name,status);
    this.router2.navigate(['/vaisseaux']);
  }
}
