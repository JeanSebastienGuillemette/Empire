import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceVaisseau } from '../services/service-vaisseau';
import { ServicePanier } from '../services/service-panier';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-vaisseau-models',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './vaisseau-models.html',
  styleUrl: './vaisseau-models.scss',
})
export class VaisseauModels {
  @Input() vaisseauNom: string = 'TIE Fighter';
  @Input() vaisseauStatus: string = 'Non Disponible';
  @Input() indexDesVaisseaux: number = 5;
  @Input() id: number = 2;
  ajoute = false;

  constructor(private service: ServiceVaisseau, private servicePanier: ServicePanier, private router: Router) { }

  getStatus() {
    return this.vaisseauStatus;
  }

  getColor() {
    if (this.vaisseauStatus === 'Non disponible') {
      return 'red';
    }
    else if (this.vaisseauStatus === 'Disponible') {
      return 'green';
    }
    else { return 'black' }
  }

  onSwitchOn() {
    this.service.switchOnOne(this.indexDesVaisseaux);
  }

  onSwitchOff() {
    this.service.switchOffOne(this.indexDesVaisseaux);
  }

  onAjouterAuPanier() {
    this.servicePanier.ajouterAuPanier(this.id, this.vaisseauNom, this.vaisseauStatus).subscribe(() => {
      this.ajoute = true;
      setTimeout(() => this.ajoute = false, 2000);
    });
  }

  OnSubmit() {
    if (confirm("Êtes-vous certain de vouloir détruire le vaisseau? L'empereur n'est pas aussi indulgent que moi...")) {
      this.service.detruireOne(this.id);
      alert("Vaisseau détruit... Que la force soit avec vous...");
      this.service.getVaisseauFromServer()
        .subscribe((response: any) => {
          this.service.vaisseaux = response;
          this.router.navigate(['/refresh']);
        });
    }
  }
}
